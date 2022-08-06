import web3Utils from 'web3-utils'

export default async function memoryFetch(url, type) {
  var key = web3Utils.sha3(url)

  var element
  try {
    element = JSON.parse(window.localStorage.getItem(key))
  } catch (e) {}
  if (element) {
    return element
  }

  element = await fetch(url)
  element = await element[type || 'json']()

  try {
    window.localStorage.setItem(key, JSON.stringify(element))
  } catch (e) {}
  return element
}
