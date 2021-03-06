import web3Utils from 'web3-utils'

/**
 * Check if is an ethereum address
 * @param ad
 * @return {boolean}
 */
function isEthereumAddress(ad) {
  if (ad === undefined || ad === null) {
    return false
  }
  let address = ad.split(' ').join('')
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    return true
  } else {
    address = address.replace('0x', '')
    const addressHash = web3Utils.sha3(address.toLowerCase())
    for (let i = 0; i < 40; i++) {
      if (
        (parseInt(addressHash[i], 16) > 7 &&
          address[i].toUpperCase() !== address[i]) ||
        (parseInt(addressHash[i], 16) <= 7 &&
          address[i].toLowerCase() !== address[i])
      ) {
        //return false;
      }
    }
  }
  return true
}

export default isEthereumAddress
