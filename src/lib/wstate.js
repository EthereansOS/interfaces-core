import { ethosEvents } from '..'

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
  console.log('WSTATE')
  console.log(state)
}

const dispatch = ethosEvents.publish

const subscribe = ethosEvents.subscribe

window.set = set
window.get = get
window.dispatch = dispatch
window.reset = reset
window.subscribe = subscribe
window.print = print
