import web3Utils from 'web3-utils'

import formatMoney from './formatMoney'
import numberToString from './numberToString'
import toEthereumSymbol from './toEthereumSymbol'

/**
 * From decimal
 * @param number
 * @param decimals
 * @param skipFormat
 * @return {string|*|string|string}
 */
function fromDecimals(number, decimals, skipFormat) {
  number = Number(!isNaN(number?.value) ? number.value : number)
  decimals = Number(!isNaN(decimals?.value) ? decimals.value : decimals)

  if (!number) {
    number = '0'
  }

  if (!decimals || parseInt(decimals) === 0) {
    return number
  }

  if (!number || !decimals) {
    return '0'
  }

  const symbol = toEthereumSymbol(decimals)
  if (symbol) {
    const result = web3Utils.fromWei(numberToString(number), symbol)
    return skipFormat === true ? result : formatMoney(result)
  }

  const nts = parseFloat(
    numberToString(number / (decimals < 2 ? 1 : Math.pow(10, decimals)))
  )

  // TODO verify if is expected that is rounded to 2 decimals
  return skipFormat === true ? numberToString(nts) : formatMoney(nts)
}

export default fromDecimals
