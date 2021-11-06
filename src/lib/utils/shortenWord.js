/**
 * Shorten word
 * @param context
 * @param word
 * @return {string|string}
 */
function shortenWord({ context }, word) {
  var charsAmount = (context && context.charsAmount) || (context && context.defaultCharsAmount) || 5;
  return word
    ? word.substring(
        0,
        word.length < charsAmount
          ? word.length
          : charsAmount
      ) + (word.length <= charsAmount ? '' : ((context && context.shortenWordSuffix) || ''))
    : ''
}

export default shortenWord
