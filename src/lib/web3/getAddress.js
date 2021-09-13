/**
 * Get current ethereum address
 *
 * @param {Object} adapters - The adapters injected required by the function.
 * @param {web3} adapters.web3 - The web3 instance.
 * @return Promise<string>
 */
export async function getAddress({ web3 }) {
  return (await web3.eth.getAccounts())[0]
}
