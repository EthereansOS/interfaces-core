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

const DEFAULT_BLOCK_INTERVAL = 15
const DEFAULT_BLOCK_INTERVAL_TIMEOUT = 40000

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

const Web3ContextInitializer = ({
  children,
  blockInterval,
  blockIntervalTimeout,
}) => {
  const realBlockInterval = blockInterval || DEFAULT_BLOCK_INTERVAL
  const realBlockIntervalTimeout =
    blockIntervalTimeout || DEFAULT_BLOCK_INTERVAL_TIMEOUT

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

  const [intervalId, setIntervalId] = useState(0)
  const [block, setBlock] = useState(0)

  useEffect(() => {
    setIpfsHttpClient(createIpfsHttpClient(context.ipfsHost))
  }, [context])

  async function tryUpdateBlock(force) {
    try {
      var currentBlock = await sendAsync(
        wallet.ethereum,
        'eth_getBlockByNumber',
        'latest',
        true
      )
      var currentBlockNumber = parseInt(currentBlock.number)
      if (force === true || currentBlockNumber - block >= realBlockInterval) {
        setBlock(currentBlockNumber)
      }
    } catch (e) {}
  }

  window.updateAccount =
    window.updateAccount ||
    async function updateAccount(acc) {
      delete window.account
      acc && (window.account = acc)
      try {
        acc &&
          window.ganache &&
          (await sendAsync(window.ganache, 'evm_addAccount', acc, 0))
      } catch (e) {}
      setTimeout(resetBlockInterval)
    }

  function resetBlockInterval() {
    intervalId && clearInterval(intervalId)
    wallet && wallet.ethereum && tryUpdateBlock(true)
    wallet &&
      wallet.ethereum &&
      setIntervalId(setInterval(tryUpdateBlock, realBlockIntervalTimeout))
  }

  useEffect(resetBlockInterval, [
    realBlockInterval,
    realBlockIntervalTimeout,
    wallet && wallet.ethereum,
  ])

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

  useEffect(() => {
    setContracts({})
    setGlobalContracts(globalContractNames.map(newContractByName))
    setChainId((wallet && wallet.chainId) || null)
    resetBlockInterval()
  }, [wallet && wallet.chainId])

  const setConnector = (connector) => {
    setConnectionStatus(connector ? CONNECTING : NOT_CONNECTED)
    wallet && connector && wallet.connect(connector.id)
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
    if (index === -1 || !globalContracts[index]) {
      var contract = newContractByName(contractName)
      if (index === -1) {
        contract && setGlobalContracts((oldValue) => [...oldValue, contract])
        contract &&
          setGlobalContractNames((oldValue) => [...oldValue, contractName])
      } else if (contract) {
        var newGlobalContracts = [...globalContracts]
        newGlobalContracts[index] = contract
        setGlobalContracts(() => newGlobalContracts)
      }
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
        account: window.account || wallet.account,
        chainId: chainId,
        chainName: wallet.networkName,
        web3: web3Instance,
        block,
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
