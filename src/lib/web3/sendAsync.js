import Web3 from 'web3'

const instrumentedProviders = []

const instrumentableMethods = ['eth_call', 'eth_getLogs']

async function instrumentProvider(provider, method) {
  if (instrumentableMethods.indexOf(method) === -1) {
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
