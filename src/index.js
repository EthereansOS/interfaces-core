export * from './context/GlobalContexts'
export * from './hooks/usePlugins'
export * from './hooks/usePrevious'
export * from './hooks/useLocalStorage'
export * from './hooks/useIsUnmounted'
export * from './hooks/useLoadUniswapPairs'
export * from './hooks/useInit'
export * from './context/Web3Context'
export * from './lib/web3/index'
export * from './lib/utils/index'
export * from './lib/math/index'
export * from './lib/constants'

export { default as web3Utils } from 'web3-utils'
export { default as useEthosContext } from './hooks/useEthosContext'
export { default as ethosEvents } from './lib/ethosEvents'
export { default as tokenPercentage } from './lib/tokenPercentage'

export * from 'use-wallet'

export {
  CONNECTED as WEB3_CONNECTED,
  CONNECTING as WEB3_CONNECTING,
  NOT_CONNECTED as WEB3_NOT_CONNECTED,
  UPDATING as WEB3_UPDATING,
} from './lib/web3'
