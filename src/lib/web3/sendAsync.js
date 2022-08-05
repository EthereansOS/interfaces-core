import Web3 from 'web3'

const instrumentedProviders = []

const defaultInstrumentableMethods = [
  'eth_call',
  'eth_getLogs',
  'eth_estimateGas',
]

async function instrumentProvider(provider, method) {
  var instrumentableMethods = []
  try {
    instrumentableMethods = [
      ...(sendAsync.context.providerInstrumentableMethods || []),
    ]
  } catch (e) {}

  instrumentableMethods.push(...defaultInstrumentableMethods)
  instrumentableMethods = instrumentableMethods
    .map((it) => it.toLowerCase())
    .filter((it, i, arr) => arr.indexOf(it) === i)

  if (instrumentableMethods.indexOf(method.toLowerCase()) === -1) {
    return provider
  }

  var entry = instrumentedProviders.filter((it) => it.provider === provider)[0]

  if (entry) {
    return entry.instrumentedProvider
  }

  const chainId = parseInt(await sendAsync(provider, 'eth_chainId'))

  instrumentedProviders.push(
    (entry = {
      chainId,
      provider,
      instrumentedProvider: provider,
    })
  )

  const { chainProvider } = sendAsync.context || {
    chainProvider: {},
  }
  return (entry.instrumentedProvider =
    chainId !== 1 && chainProvider[chainId]
      ? new Web3.providers.HttpProvider(chainProvider[chainId])
      : provider)
}

async function sendAsync(inputProvider, method) {
  var provider = await instrumentProvider(inputProvider, method)
  var params = [...arguments].slice(2) || []
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

export default sendAsync
