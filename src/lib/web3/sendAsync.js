import Web3 from 'web3'

const instrumentedProviders = {}

const chainIds = {}

async function sendAsync(inputProvider, method) {
  var provider = inputProvider
  if (method !== 'eth_chainId') {
    const chainId = (chainIds[provider] = parseInt(
      chainIds[provider] || (await sendAsync(provider, 'eth_chainId'))
    ))
    const { chainProvider } = sendAsync.context || {
      chainProvider: {},
    }
    provider =
      chainId !== 1 && chainProvider[chainId]
        ? (instrumentedProviders[chainId] =
            instrumentedProviders[chainId] ||
            new Web3.providers.HttpProvider(chainProvider[chainId]))
        : provider
  }
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
