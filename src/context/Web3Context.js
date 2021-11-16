import React, { useContext, useState, useEffect } from 'react'
import T from 'prop-types'
import { create as createIpfsHttpClient } from 'ipfs-http-client'
import { UseWalletProvider, useWallet } from 'use-wallet'
import Web3 from 'web3'
import web3Utils from 'web3-utils'

import sendAsync from '../lib/web3/sendAsync'
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

  const [ipfsHttpClient, setIpfsHttpClient] = useState(
    createIpfsHttpClient(context.ipfsHost)
  )

  const wallet = useWallet()
  const [connectionStatus, setConnectionStatus] = useState(NOT_CONNECTED)
  const [web3Instance, setWeb3Instance] = useState(null)
  const [chainId, setChainId] = useState(null)

  const [globalContractNames, setGlobalContractNames] = useState([])
  const [globalContracts, setGlobalContracts] = useState([])
  const [contracts, setContracts] = useState({})

  useEffect(() => {
    setIpfsHttpClient(createIpfsHttpClient(context.ipfsHost))
  }, [context])

  useEffect(() => {
    setConnectionStatus(
      wallet && wallet.ethereum
        ? CONNECTED
        : connectionStatus === CONNECTING
        ? CONNECTING
        : NOT_CONNECTED
    )
    setWeb3Instance(
      (wallet &&
        wallet.ethereum &&
        (web3Instance || new Web3(wallet.ethereum))) ||
        null
    )
  }, [wallet])

  const setConnector = (connector) => {
    setConnectionStatus(connector ? CONNECTING : NOT_CONNECTED)
    wallet && connector && wallet.connect(connector.id)
    wallet && !connector && setContracts({})
    wallet &&
      !connector &&
      setGlobalContracts(globalContractNames.map(newContractByName))
    wallet && !connector && setChainId((wallet && wallet.chainId) || null)
    wallet && !connector && wallet.reset()
  }

  const newContract = (abi, address) => {
    address = address ? web3Utils.toChecksumAddress(address) : ''
    var key = web3Utils.sha3(JSON.stringify(abi) + address)
    var contract = contracts[key]
    contract =
      contract || (web3Instance && new web3Instance.eth.Contract(abi, address))
    contract && setContracts((oldValue) => ({ ...oldValue, [key]: contract }))
    return contract
  }

  const newContractByName = (contractName) =>
    newContract(
      context[
        contractName[0].toUpperCase() + contractName.substring(1) + 'ABI'
      ],
      getNetworkElement(
        { context, chainId: wallet.chainId },
        contractName + 'Address'
      )
    )

  const getGlobalContract = (contractName) => {
    var index = globalContractNames.indexOf(contractName)
    if (index === -1) {
      var contract = newContractByName(contractName)
      contract && setGlobalContracts((oldValue) => [...oldValue, contract])
      contract &&
        setGlobalContractNames((oldValue) => [...oldValue, contractName])
      return contract
    }
    return globalContracts[index]
  }

  const value = {
    connectionStatus,
    setConnector,
    connectors: Object.entries(wallet.connectors)
      .filter((it) => it[1][1])
      .map((it) => ({ id: it[0], ...it[1][1] })),
    ipfsHttpClient,
    ...(wallet &&
      connectionStatus === CONNECTED && {
        account: wallet.account,
        chainId: chainId,
        chainName: wallet.networkName,
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
