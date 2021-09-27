import PubSub from 'pubsub-js'

const storeKey = 'ethosWState'
const getDefaultState = () => ({})
const restoredState = sessionStorage.getItem(storeKey)
let state = restoredState ? JSON.parse(restoredState) : getDefaultState()

const dispatch = (payload) => PubSub.publish(storeKey, payload)

const get = (key) => {
  return state[key]
}

const set = (key, value) => {
  state[key] = value
  sessionStorage.setItem(storeKey, JSON.stringify(state))
  dispatch(state)

  return state
}

const setObject = (value) => {
  state = { ...state, ...value }
  sessionStorage.setItem(storeKey, JSON.stringify(state))
  dispatch(state)

  return state
}

const reset = () => {
  state = getDefaultState()

  sessionStorage.removeItem(storeKey)
  dispatch(state)

  return state
}

const print = () => {
  console.log('----wstate----')
  console.log(state)
}

const subscribe = (subscribeFn) => PubSub.subscribe(storeKey, subscribeFn)
const unsubscribe = PubSub.unsubscribe

window[storeKey] = {
  set,
  setObject,
  get,
  reset,
  print,
  subscribe,
  unsubscribe,
}
