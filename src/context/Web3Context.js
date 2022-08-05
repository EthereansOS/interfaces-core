import React, { useContext, useState, useEffect, useCallback } from 'react'
import T from 'prop-types'
import { create as createIpfsHttpClient } from 'ipfs-http-client'
import { UseWalletProvider, useWallet } from 'use-wallet'
import Web3 from 'web3'
import web3Utils from 'web3-utils'
import { utils } from 'ethers'

import sendAsync from '../lib/web3/sendAsync'
import getNetworkElement from '../lib/web3/getNetworkElement'
import { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'
import useEthosContext from '../hooks/useEthosContext'
export const abi = new utils.AbiCoder()

const Web3Context = React.createContext('web3')

const DEFAULT_BLOCK_INTERVAL = 15
const DEFAULT_BLOCK_INTERVAL_TIMEOUT = 40000

export const web3States = { NOT_CONNECTED, CONNECTED, CONNECTING }

export const useWeb3 = () => useContext(Web3Context)

export const Web3ContextProvider = (props) => {
  const context = useEthosContext()

  sendAsync.context = sendAsync.context || context

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

  const [dualChainId, setDualChainId] = useState(null)
  const [dualBlock, setDualBlock] = useState(0)
  const [dualChainWeb3, setDualChainWeb3] = useState(null)

  useEffect(() => {
    setIpfsHttpClient(createIpfsHttpClient(context.ipfsHost))
  }, [context])

  const tryUpdateBlock = useCallback(
    async (provider, oldValue, setter, force) => {
      if (!provider) {
        return setter(0)
      }
      try {
        var currentBlockNumber = parseInt(
          await sendAsync(provider, 'eth_blockNumber')
        )
        if (
          force === true ||
          currentBlockNumber - oldValue >= realBlockInterval
        ) {
          setter(currentBlockNumber)
        }
      } catch (e) {}
    },
    [realBlockInterval]
  )

  const tryUpdateDualChainBlock = useCallback(
    async (web3, oldValue, setter, force) => {
      if (!web3?.currentProvider) {
        return setter(0)
      }
      try {
        var currentBlockNumber = await sendAsync(
          web3.currentProvider,
          'eth_call',
          {
            to: '0x4200000000000000000000000000000000000013',
            data: web3Utils.sha3('getL1BlockNumber()').substring(0, 10),
          }
        )
        currentBlockNumber = abi
          .decode(['uint256'], currentBlockNumber)[0]
          .toString()
        currentBlockNumber = parseInt(currentBlockNumber)
        if (
          force === true ||
          currentBlockNumber - oldValue >= realBlockInterval
        ) {
          setter(currentBlockNumber)
        }
      } catch (e) {}
    },
    [realBlockInterval]
  )

  var resetBlockInterval = useCallback(() => {
    intervalId && clearInterval(intervalId)
    tryUpdateBlock(wallet?.ethereum, block, setBlock, true)
    tryUpdateDualChainBlock(
      dualChainWeb3 && wallet?.ethereum,
      dualBlock,
      setDualBlock,
      true
    )
    if ((wallet && wallet.ethereum) || dualChainWeb3) {
      setIntervalId(
        setInterval(() => {
          wallet &&
            wallet.ethereum &&
            tryUpdateBlock(wallet.ethereum, block, setBlock)
          dualChainWeb3 &&
            wallet &&
            wallet.ethereum &&
            tryUpdateDualChainBlock(wallet.ethereum, dualBlock, setDualBlock)
        }, realBlockIntervalTimeout)
      )
    }
  }, [wallet, dualChainWeb3, realBlockIntervalTimeout, intervalId])

  useEffect(resetBlockInterval, [
    realBlockInterval,
    realBlockIntervalTimeout,
    wallet && wallet.ethereum,
    dualChainWeb3,
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
    var actualChainId = (wallet && wallet.chainId) || null
    setChainId(actualChainId)
    var actualDualChainId =
      (actualChainId && context.dualChainId[actualChainId]) || null
    setDualChainId(actualDualChainId)
    setDualChainWeb3(
      (actualDualChainId &&
        new Web3(context.chainProvider[actualDualChainId])) ||
        null
    )
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

  useEffect(() => {
    try {
      sendAsync.instrumentedProviders = []
    } catch (e) {}
  }, [chainId, web3Instance, dualChainId, dualChainWeb3])

  window.setAccount = async function setAccount(acc) {
    delete window.account
    acc && (window.account = acc)
    try {
      acc &&
        window.ganache &&
        (await sendAsync(window.ganache, 'evm_addAccount', acc, 0))
    } catch (e) {}
    setBlock(new Date().getTime())
    setDualBlock(new Date().getTime())
    setTimeout(resetBlockInterval)
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
        dualChainId,
        dualBlock,
        dualChainWeb3,
      }),
    ...(wallet && wallet.error && { errorMessage: wallet.error.message }),
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

Web3ContextInitializer.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}
