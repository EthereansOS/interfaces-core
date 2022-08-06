import Web3 from 'web3'

const defaultInstrumentableMethods = [
  'eth_call',
  'eth_getLogs',
  'eth_estimateGas',
]

async function instrumentProvider(provider, method) {
  var instrumentableMethods = [...defaultInstrumentableMethods]

  try {
    instrumentableMethods = [
      ...(sendAsync.context.providerInstrumentableMethods ||
        defaultInstrumentableMethods),
    ]
  } catch (e) {}

  instrumentableMethods = instrumentableMethods
    .map((it) => it.toLowerCase())
    .filter((it, i, arr) => arr.indexOf(it) === i)

  if (instrumentableMethods.indexOf(method.toLowerCase()) === -1) {
    return provider
  }

  var entry = sendAsync.instrumentedProviders.filter(
    (it) => it.provider === provider
  )[0]

  if (entry) {
    return entry.instrumentedProvider
  }

  const chainId = parseInt(await sendAsync(provider, 'eth_chainId'))

  entry = {
    chainId,
    provider,
    instrumentedProvider: provider,
  }

  sendAsync.instrumentedProviders.push(entry)

  const { chainProvider } = sendAsync.context || {
    chainProvider: {},
  }
  return (entry.instrumentedProvider =
    chainId !== 1 && chainProvider[chainId]
      ? new Web3.providers.HttpProvider(chainProvider[chainId])
      : provider)
}

async function sendAsyncInternal(provider, method, params) {
  return await new Promise(async function (ok, ko) {
    try {
      await (provider.sendAsync || provider.send).call(
        provider,
        {
          jsonrpc: '2.0',
          method,
          params,
          id: new Date().getTime(),
        },
        function (error, response) {
          return error || (response && response.error)
            ? ko(error || (response && response.error))
            : ok(response && response.result)
        }
      )
    } catch (e) {
      return ko(e)
    }
  })
}

async function sendAsync(provider, method) {
  var params = [...arguments].slice(2) || []

  try {
    return await sendAsyncInternal(provider, method, params)
  } catch (e) {
    var message = (e.stack || e.message || e.toString()).toLowerCase()
    if (message.indexOf('execution reverted') !== -1) {
      throw e
    }
    var instrumentedProvider = await instrumentProvider(provider, method)
    if (provider === instrumentedProvider) {
      throw e
    }
    return await sendAsyncInternal(instrumentedProvider, method, params)
  }
}

sendAsync.instrumentedProviders = []

export default sendAsync
