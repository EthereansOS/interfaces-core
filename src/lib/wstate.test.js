import './wstate'

describe('wstate', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be available as window.wstate and contain set, get, reset, print, subscribe methods', () => {
    expect(window.wstate).toMatchObject({
      set: expect.any(Function),
      get: expect.any(Function),
      reset: expect.any(Function),
      print: expect.any(Function),
      subscribe: expect.any(Function),
      unsubscribe: expect.any(Function),
    })
  })

  it('should set a value and return the state and store it in sessionStorage', () => {
    Storage.prototype.setItem = jest.fn()
    const res = window.wstate.set('key', 'value')

    expect(res).toMatchObject({
      key: 'value',
    })
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'wstate',
      JSON.stringify({
        key: 'value',
      })
    )
  })

  it('should set a value under a certain key and be able to retrieve it calling get(key)', () => {
    window.wstate.set('key', 'value')

    const res = window.wstate.get('key')

    expect(res).toBe('value')
  })

  it('should set a value and call console.log when calling the print() method', () => {
    console.log = jest.fn()
    window.wstate.set('key', 'value')
    window.wstate.print()

    expect(console.log).toHaveBeenCalledWith('----wstate----')
    expect(console.log).toHaveBeenCalledWith({
      key: 'value',
    })
  })

  it('should set a value and reset it to the initial state calling the reset() method and store it in sessionStorage', () => {
    Storage.prototype.setItem = jest.fn()

    window.wstate.set('key', 'value')
    window.wstate.reset()

    const res = window.wstate.get('key')

    expect(res).toBe(undefined)
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'wstate',
      JSON.stringify({})
    )
  })

  it('should publish a state change to all subscribers', async () => {
    let valueFromSubscriber
    const sub = (name, value) => {
      valueFromSubscriber = value
    }

    window.wstate.subscribe(sub)
    window.wstate.set('dispatched', 'value')

    await new Promise((res) => setTimeout(res, 1000))

    expect(valueFromSubscriber).toMatchObject({
      dispatched: 'value',
    })
  })
})
