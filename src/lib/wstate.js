import PubSub from 'pubsub-js'

const cleanState = {}
const restoredState = sessionStorage.getItem('wstate')
const initialState = restoredState ? JSON.parse(restoredState) : cleanState

let state = {}

// do we want export the dispatch function?
const dispatch = (payload) => PubSub.publish('wstate', payload)

const get = (key) => {
  return state[key]
}

// do we want key, value or just value?
const set = (key, value) => {
  state[key] = value
  sessionStorage.setItem('wstate', JSON.stringify(state))
  dispatch(state)

  return state
}

const reset = () => {
  // deep, shallow or nothing?
  state = cleanState
  sessionStorage.setItem('wstate', JSON.stringify(initialState))
  dispatch(state)

  return state
}

const print = () => {
  console.log('----wstate----')
  console.log(state)
}

const subscribe = (subscribeFn) => PubSub.subscribe('wstate', subscribeFn)
const unsubscribe = PubSub.unsubscribe

window.wstate = {
  set,
  get,
  reset,
  print,
  subscribe,
  unsubscribe,
}
