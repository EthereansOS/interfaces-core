import getNetworkElement from './getNetworkElement'

/**
 * Get logs
 *
 * @param {Object} adapters - The adapters injected required by the function.
 * @param {web3} adapters.web3 - The web3 instance.
 * @param {web3} adapters.web3ForLogs - The web3 for log instancee.
 * @param {EthosContext} adapters.context - The application context.
 * @param {string} adapters.networkId - The network id.
 * @param element
 * @param endOnFirstResult
 * @return {Promise<*>}
 */
const getLogs = async function (
  { web3, web3ForLogs, context, networkId },
  element,
  endOnFirstResult
) {
  const args = JSON.parse(JSON.stringify(element))
  const logs = []
  args.fromBlock =
    args.fromBlock ||
    getNetworkElement({ context, networkId }, 'deploySearchStart') + ''
  args.toBlock = args.toBlock || (await web3.eth.getBlockNumber()) + ''
  const to = parseInt(args.toBlock)
  const fillWithWeb3Logs = async function (logs, args) {
    if (web3.currentProvider === web3ForLogs.currentProvider) {
      return logs
    }
    const newArgs = {}
    Object.entries(args).forEach((entry) => (newArgs[entry[0]] = entry[1]))
    newArgs.fromBlock = web3.startBlock
    newArgs.toBlock = 'latest'
    logs.push(...(await web3.eth.getPastLogs(newArgs)))
    return logs
  }
  while (isNaN(to) || parseInt(args.fromBlock) <= to) {
    let newTo = parseInt(args.fromBlock) + context.blockSearchSection
    newTo = newTo <= to ? newTo : to
    args.toBlock = isNaN(newTo) ? args.toBlock : newTo + ''
    logs.push(...(await web3ForLogs.eth.getPastLogs(args)))
    if (isNaN(to) || (logs.length > 0 && endOnFirstResult === true)) {
      return await fillWithWeb3Logs(logs, args)
    }
    args.fromBlock = parseInt(args.toBlock) + 1 + ''
  }
  return await fillWithWeb3Logs(logs, args)
}

export default getLogs
