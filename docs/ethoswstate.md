# ethosWState

Whenever a project imports the interfaces-core package for the first time, a state lib is inserted under the window object at window.ethosWState.

It contains the following methods:

```js
{
  set,
  setObject,
  get,
  reset,
  print,
  subscribe,
  unsubscribe,
}
```

It persists the data into the following sessionStorage key: "ethosWState".<br/>
Uses [PubSubJS](https://github.com/mroderick/PubSubJS) under the hood for the subscribe/set mechanism. The events are shared on the "ethosWState" topic.

This module is used to debug stuff and insert data directly into the browser's console to make listeners pick up new values.

## API

```
setObject: (value: any) => newState
set: (key: string, value: any) => newState
get: (key) => value
reset: () => newState
print: () => void // prints the state entire value in the browser's terminal
subscribe: (subscriber: fn) => void
unsubscribe: (subscribeReturn) => void
```
