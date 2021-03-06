import uploadToIPFS from './uploadToIPFS'
import extractComment from './extractComment'
import formatLink from './formatLink'
import getNextFunctionalityVersion from './getNextFunctionalityVersion'

/**
 * Generate functionality metadata link
 *
 * @param {Object} adapters - The adapters injected required by the function.
 * @param {web3} adapters.web3 - The web3 instance.
 * @param {EthosContext} adapters.context - The application context.
 * @param {IpfsHttpClient} adapters.ipfsHttpClient - The ipfsHttpClient.
 * @param data
 * @return Promise<>
 */
async function generateFunctionalityMetadataLink(
  { web3, context, ipfsHttpClient },
  data
) {
  var comments = {}
  try {
    comments = extractComment({ context }, data.sourceCode || data.code)
  } catch (e) {}
  var codeName = data.codeName || data.functionalityName
  var replaces = data.replaces || data.functionalityReplace
  var metadata = {
    title: data.title,
    codeName,
    description: {
      Discussion: formatLink(
        { context },
        comments.Discussion || data.element.ensComplete
      ),
      Description: comments.Description,
      Update: comments.Update,
    },
    code: data.sourceCode || data.code,
    version: await getNextFunctionalityVersion(
      { web3, context },
      data,
      codeName,
      replaces
    ),
  }
  return await uploadToIPFS({ context, ipfsHttpClient }, metadata)
}

export default generateFunctionalityMetadataLink
