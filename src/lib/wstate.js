import PubSub from 'pubsub-js'

const restoredState = sessionStorage.getItem('wstate')
const initialState = restoredState ? JSON.parse(restoredState) : {}

let state = {}

const get = (key) => {
  return state[key]
}

const set = (key, value) => {
  state[key] = value
  sessionStorage.setItem('wstate', JSON.stringify(state))
}

const reset = () => {
  state = { ...initialState }
  sessionStorage.setItem('wstate', JSON.stringify(initialState))
}

const print = () => {
  console.log('----wstate----')
  console.log(state)
}

const dispatch = (payload) => PubSub.publish('wstate', payload)

const subscribe = (payload) => PubSub.subscribe('wstate', payload)

window.wSet = set
window.wGet = get
window.wDispatch = dispatch
window.wReset = reset
window.wSubscribe = subscribe
window.wPrint = print
