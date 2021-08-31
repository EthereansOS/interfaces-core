import React, { useContext, useState, useEffect } from 'react'
import T from 'prop-types'
import { create as createIpfsHttpClient } from 'ipfs-http-client'
import { UseWalletProvider, useWallet } from 'use-wallet'

import ethosEvents from '../lib/ethosEvents'
import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'
import { usePlaceholder } from '../hooks/usePlugins'
import useEthosContext from '../hooks/useEthosContext'

const Web3Context = React.createContext('web3')

const WEB3_CONTEXT_STATUS_NEW = 'WEB3_CONTEXT_STATUS_NEW'
const WEB3_CONTEXT_STATUS_ON_INIT = 'WEB3_CONTEXT_STATUS_ON_INIT'
const WEB3_CONTEXT_STATUS_INIT = 'WEB3_CONTEXT_STATUS_INIT'

// https://chainlist.org/
const CHAINS = new Map([
  ['Mainnet', 1],
  ['Ropsten', 3],
])

export const Web3ContextProvider = (props) => {
  return (
    <UseWalletProvider chainId={CHAINS.get('Ropsten')} connectors={{}}>
      <Web3ContextInitializer {...props} />
    </UseWalletProvider>
  )
}

const Web3ContextInitializer = ({ children }) => {
  const [initStatus, setInitStatus] = useState(WEB3_CONTEXT_STATUS_NEW)
  const [state, setState] = useState({
    connectionStatus: NOT_CONNECTED,
  })
  const context = useEthosContext()
  const wallet = useWallet()
  const [methods, setMethods] = useState({ connect: wallet.connect })

  const afterInitFunctionList = usePlaceholder('web3/afterInit')

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
