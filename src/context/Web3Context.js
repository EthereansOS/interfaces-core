import React, { useContext, useState, useEffect, useCallback } from 'react'
import T from 'prop-types'
import { create as createIpfsHttpClient } from 'ipfs-http-client'
import { UseWalletProvider, useWallet } from 'use-wallet'
import Web3 from 'web3'
import web3Utils from 'web3-utils'

import getNetworkElement from '../lib/web3/getNetworkElement'
import { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'
import useEthosContext from '../hooks/useEthosContext'

const Web3Context = React.createContext('web3')

export const web3States = { NOT_CONNECTED, CONNECTED, CONNECTING }

export const useWeb3 = () => useContext(Web3Context)

export const Web3ContextProvider = (props) => {
  const context = useEthosContext()

  const connectors = context.useWalletSettings.reduce(
    (acc, connector) => ({
      ...acc,
      ...{
        [connector.id]: {
          ...connector.settings,
          buttonText: connector.buttonText,
        },
      },
    }),
    {}
  )

  return (
    <UseWalletProvider connectors={connectors}>
      <Web3ContextInitializer {...props} />
    </UseWalletProvider>
  )
}

const Web3ContextInitializer = ({ children }) => {
  const context = useEthosContext()
  const { wallet, connectors } = useWallet()

  const [connectionStatus, setConnectionStatus] = useState(NOT_CONNECTED)
  const [ipfsHttpClient, setIpfsHttpClient] = useState(
    createIpfsHttpClient(context.ipfsHost)
  )

  const [provider, setProvider] = useState(null)
  const [web3Instance, setWeb3Instance] = useState(null)
  const [chainId, setChainId] = useState(null)

  const [globalContractNames, setGlobalContractNames] = useState([])
  const [globalContracts, setGlobalContracts] = useState([])

  const [contracts, setContracts] = useState({})

  useEffect(() => {
    setConnectionStatus(
      wallet && wallet.ethereum ? CONNECTED : connectionStatus || NOT_CONNECTED
    )
    setProvider((wallet && wallet.ethereum) || null)
    setChainId((wallet && wallet.chainId) || null)
  }, [wallet])

  useEffect(() => {
    setWeb3Instance(provider ? new Web3(provider) : null)
  }, [provider])

  useEffect(() => {
    setIpfsHttpClient(createIpfsHttpClient(context.ipfsHost))
  }, [context])

  useEffect(() => {
    setContracts({})
    setGlobalContracts(globalContractNames.map(newContractByName))
  }, [chainId])

  const connect = useCallback(
    (connector) => {
      setConnectionStatus(CONNECTING)
      wallet.connect(connector.id)
    },
    [wallet]
  )

  const disconnect = useCallback(() => {
    wallet && wallet.reset()
    setConnectionStatus(NOT_CONNECTED)
  }, [wallet])

  const newContract = useCallback(
    (abi, address) => {
      address = address ? web3Utils.toChecksumAddress(address) : ''
      var key = web3Utils.sha3(JSON.stringify(abi) + address)
      var contract = contracts[key]
      contract = contract || new web3Instance.eth.Contract(abi, address)
      contract && setContracts((oldValue) => ({ ...oldValue, [key]: contract }))
      return contract
    },
    [contracts, web3Instance, setContracts]
  )

  const newContractByName = useCallback(
    (contractName) =>
      newContract(
        context[
          contractName[0].toUpperCase() + contractName.substring(1) + 'ABI'
        ],
        getNetworkElement({ context, chainId }, contractName + 'Address')
      ),
    [context, chainId, newContract]
  )

  const getGlobalContract = useCallback(
    (contractName) => {
      var index = globalContractNames.indexOf(contractName)
      if (index === -1) {
        var contract = newContractByName(contractName)
        contract && setGlobalContracts((oldValue) => [...oldValue, contract])
        contract &&
          setGlobalContractNames((oldValue) => [...oldValue, contractName])
        return contract
      }
      return globalContracts[index]
    },
    [
      globalContractNames,
      globalContracts,
      setGlobalContracts,
      setGlobalContractNames,
      newContractByName,
    ]
  )

  const value = {
    connectionStatus,
    ...(connectionStatus === NOT_CONNECTED && { connect }),
    connectors: Object.entries(connectors)
      .filter((it) => it[1][1])
      .map((it) => ({ id: it[0], ...it[1][1] })),
    ipfsHttpClient,
    ...(wallet &&
      connectionStatus === CONNECTED && {
        disconnect,
        account: wallet.account,
        chainId,
        chainName: wallet.networkName,
        provider,
        web3: web3Instance,
        getGlobalContract,
        newContract,
      }),
    ...(wallet && wallet.error && { errorMessage: wallet.error.message }),
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

Web3ContextInitializer.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}
