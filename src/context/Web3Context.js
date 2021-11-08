import React, { useContext, useState, useEffect, useCallback } from 'react'
import T from 'prop-types'
import { create as createIpfsHttpClient } from 'ipfs-http-client'
import { UseWalletProvider, useWallet } from 'use-wallet'

import ethosEvents from '../lib/ethosEvents'
import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'
import { usePlaceholder } from '../hooks/usePlugins'
import useEthosContext from '../hooks/useEthosContext'

const Web3Context = React.createContext('web3')

export const Web3ContextProvider = (props) => {
  const context = useEthosContext()

  const connectors = context.useWalletSettings.reduce(
    (acc, connector) => ({
      ...acc,
      ...{
        [connector.id]: connector.settings || {},
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
  const wallet = useWallet()

  const [connectionStatus, setConnectionStatus] = useState(NOT_CONNECTED)
  const [ipfsHttpClient, setIpfsHttpClient] = useState(
    createIpfsHttpClient(context.ipfsHost)
  )

  const disconnect = useCallback(() => {
    wallet && wallet.reset()
    setConnectionStatus(NOT_CONNECTED)
  }, [wallet])

  useEffect(() => {
    setConnectionStatus(
      wallet && wallet.ethereum ? CONNECTED : connectionStatus || NOT_CONNECTED
    )
  }, [wallet])

  useEffect(() => {
    setIpfsHttpClient(createIpfsHttpClient(context.ipfsHost))
  }, [context])

  const values = {
    connectionStatus,
    disconnect,
    ipfsHttpClient,
    wallet,
    ...(wallet &&
      connectionStatus === CONNECTED && {
        account: wallet.account,
        chainId: wallet.chainId,
        chainName: wallet.networkName,
        provider: wallet.ethereum,
      }),
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
