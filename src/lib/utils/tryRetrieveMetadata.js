import { toChecksumAddress } from 'web3-utils'
import { Base64 } from 'js-base64'

import blockchainCall from '../web3/blockchainCall'

import formatLink from './formatLink'
import getElementImage from './getElementImage'

export default async function tryRetrieveMetadata(
  { context, itemsTokens, ethItemElementImages, metadatas },
  item
) {
  if (item.metadataLink) {
    return
  }
  if (
    (context.pandorasBox &&
      context.pandorasBox.indexOf(toChecksumAddress(item.address)) !== -1) ||
    (item.collection &&
      context.pandorasBox.indexOf(
        toChecksumAddress(item.collection.address)
      ) !== -1) ||
    (item.collection &&
      item.collection.sourceAddress &&
      item.collection.sourceAddress !== 'blank' &&
      context.pandorasBox.indexOf(
        toChecksumAddress(item.collection.sourceAddress)
      ) !== -1)
  ) {
    item.metadataLink = 'blank'
    item.image = getElementImage({ context }, item)
    return
  }
  var clearMetadata = true
  try {
    item.metadataLink = item.id
      ? await blockchainCall(item.mainInterface.methods.uri, item.id)
      : await blockchainCall(item.mainInterface.methods.uri)
    item.id &&
      (item.metadataLink = item.metadataLink.split('0x{id}').join(item.id))
    item.metadataLink =
      (metadatas && metadatas[item.address]) || item.metadataLink
    if (item.metadataLink !== '') {
      item.image = formatLink({ context }, item.metadataLink)
      try {
        item.metadata = item.metadataLink.startsWith(
          'data:application/json;base64,'
        )
          ? JSON.parse(
              Base64.decode(
                item.metadataLink.substring(
                  'data:application/json;base64,'.length
                )
              )
            )
          : await (
              await fetch(formatLink({ context }, item.metadataLink))
            ).text()
        if (typeof item.metadata !== 'string') {
          Object.entries(item.metadata).forEach((it) => {
            if (it[1] === undefined || it[1] === null) {
              delete item.metadata[it[0]]
              return
            }
            item[it[0]] = it[1]
          })
          item.name = item.item_name || item.name
          item.description =
            item.description && item.description.split('\n\n').join(' ')
        }
      } catch (e) {
        delete item.image
        item.image = getElementImage({ context }, item)
        item.metadataMessage = `Could not retrieve metadata, maybe due to CORS restriction policies for the link (<a href="${
          item.metadataLink
        }" target="_blank">${item.metadataLink}</a>), check it on <a href="${
          item.collection
            ? context.openSeaItemLinkTemplate.format(
                item.collection.address,
                item.id
              )
            : context.openSeaCollectionLinkTemplate.format(item.address)
        }" target="_blank">Opensea</a>`
        console.error(item.metadataMessage)
      }
      clearMetadata = false
    }
  } catch (e) {}
  clearMetadata && delete item.metadata
  clearMetadata &&
    (item.metadataLink = clearMetadata ? 'blank' : item.metadataLink)
  if (
    !clearMetadata &&
    ethItemElementImages &&
    ethItemElementImages[item.address] &&
    !item.elementImageLoaded
  ) {
    item.elementImageLoaded = ethItemElementImages[item.address]
    item.logoURI = item.elementImageLoaded
    item.logoUri = item.elementImageLoaded
    item.image = item.elementImageLoaded
  }
  if (
    (itemsTokens = itemsTokens || []).filter(
      (it) => it.address === item.address
    ).length === 0
  ) {
    itemsTokens.push({
      address: item.address,
      logoURI: item.image,
    })
  }
}
