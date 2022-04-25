export default async function memoryFetch(url, type) {
  var element
  try {
    element = JSON.parse(window.localStorage.getItem(url))
  } catch (e) {}
  if (element) {
    return element
  }

  element = await fetch(url)
  element = await element[type || 'json']()

  try {
    window.localStorage.setItem(url, JSON.stringify(element))
  } catch (e) {}
  return element
}
