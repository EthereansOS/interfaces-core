import React, { useContext, useState, useEffect } from 'react'
import T from 'prop-types'
import { create as createIpfsHttpClient } from 'ipfs-http-client'
import { UseWalletProvider, useWallet } from 'use-wallet'
import { useWeb3React } from '@web3-react/core'

import ethosEvents from '../lib/ethosEvents'
import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'
import { usePlaceholder } from '../hooks/usePlugins'
import useEthosContext from '../hooks/useEthosContext'

const Web3Context = React.createContext('web3')

const WEB3_CONTEXT_STATUS_NEW = 'WEB3_CONTEXT_STATUS_NEW'
const WEB3_CONTEXT_STATUS_ON_INIT = 'WEB3_CONTEXT_STATUS_ON_INIT'
const WEB3_CONTEXT_STATUS_INIT = 'WEB3_CONTEXT_STATUS_INIT'

export const Web3ContextProvider = (props) => {
  const context = useEthosContext()
  var activeChain = props.activeChain || 1

  const connectors = context.walletConnectors.reduce((acc, connector) => {
    if (!connector.settings || connector.settings[activeChain]) {
      return {
        ...acc,
        ...{
          [connector.id]: connector.settings
            ? connector.settings[activeChain]
            : {}
        },
      }
    }
    return acc
  }, {})

  return (
    <UseWalletProvider chainId={+activeChain} connectors={connectors}>
      <Web3ContextInitializer {...props} />
    </UseWalletProvider>
  )
}

const Web3ContextInitializer = ({ children }) => {

  var test = useWeb3React();
  console.log(test);
  const [initStatus, setInitStatus] = useState(WEB3_CONTEXT_STATUS_NEW)
  const wallet = useWallet()
  const [state, setState] = useState({
    connectionStatus: NOT_CONNECTED,
    wallet,
  })
  const context = useEthosContext()
  const [methods, setMethods] = useState({})

  const afterInitFunctionList = usePlaceholder('web3/afterInit')

  useEffect(() => {
    console.log(wallet, wallet && wallet.ethereum);
    setState((s) => ({ 
      ...s,
      wallet,
      connectionStatus: wallet && wallet.ethereum ? CONNECTED : s.connectionStatus || NOT_CONNECTED
    }))
  }, [wallet])

  useEffect(() => {
    setState((s) => ({
      ...s,
      ipfsHttpClient: createIpfsHttpClient(context.ipfsHost),
    }))
  }, [context])

  useEffect(() => {
    async function run() {
      if (initStatus !== WEB3_CONTEXT_STATUS_NEW || !wallet.ethereum) {
        return
      }

      setInitStatus(WEB3_CONTEXT_STATUS_ON_INIT)
      const { onEthereumUpdate, connect: startUp } = initWeb3(
        context,
        setState,
        wallet.ethereum
      )

      setMethods((s) => ({
        ...s,
        onEthereumUpdate,
      }))

      await startUp(afterInitFunctionList.map((item) => item.fn))
      setInitStatus(WEB3_CONTEXT_STATUS_INIT)
    }

    run()
  }, [afterInitFunctionList, context, initStatus, wallet.ethereum])

  const values = {
    ...methods,
    ...state,
    ethosEvents,
    context,
    disconnect() {
      wallet && wallet.reset()
      setState((s) => ({
        ...s,
        wallet,
        connectionStatus: NOT_CONNECTED,
      }))
    }
  }

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>
}

Web3ContextInitializer.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}

export const webs3States = { NOT_CONNECTED, CONNECTED, CONNECTING }

export const useWeb3 = () => {
  const web3Context = useContext(Web3Context)
  return web3Context
}
