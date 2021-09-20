const restoredState = sessionStorage.getItem('wstate')
const initialState = restoredState ? JSON.parse(restoredState) : {}
const subscribers = []

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

const dispatch = (value) => {
  subscribers.forEach((cb) => {
    cb(value)
  })
}

const subscribe = (cb) => {
  subscribers.push(cb)

  return () => {
    const index = subscribers.indexOf(cb)
    subscribers.splice(index, 1)
  }
}

window.set = set
window.get = get
window.dispatch = dispatch
window.reset = reset
window.subscribe = subscribe
window.print = print
