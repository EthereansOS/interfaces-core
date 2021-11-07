import Web3 from 'web3'

import { VOID_ETHEREUM_ADDRESS } from '../constants'

import sendBlockchainTransaction from './sendBlockchainTransaction'
import sendAsync from './sendAsync'
import getAddress from './getAddress'

var web3 = new Web3()

async function blockchainCall() {
  var method = arguments[0]
  var args = [...arguments].slice(1)
  var from = VOID_ETHEREUM_ADDRESS
  var value = 0
  var blockNumber = null
  try {
    method = (
      method.implementation ? method.get : method.new ? method.new : method
    )(...args)
  } catch (e) {
    var data = args[args.length - 1]
    from = data.from || from
    value = data.value || value
    blockNumber = data.blockNumber || blockNumber
    method = (
      method.implementation ? method.get : method.new ? method.new : method
    )(...(args = args.slice(0, args.length - 1)))
  }
  try {
    from =
      from === VOID_ETHEREUM_ADDRESS
        ? await getAddress(method._parent.currentProvider)
        : from
  } catch (e) {
    var data = args[args.length - 1]
    if (data) {
      from = data.from || from
      value = data.value || value
      blockNumber = data.blockNumber || blockNumber
    }
  }

  var fromForSend = from
  try {
    from = web3.eth.accounts.privateKeyToAccount(fromForSend).address
  } catch (e) {}
  var to = method._parent.options.address
  var data = method.encodeABI()
  var result = await (method._method.stateMutability === 'view' ||
  method._method.stateMutability === 'pure'
    ? method.call(
        {
          from,
          value,
        },
        blockNumber
      )
    : sendBlockchainTransaction(
        method._parent.currentProvider,
        fromForSend,
        to,
        data,
        value
      ))
  if (!to) {
    method._parent.options.address = result.contractAddress
    var address = method._parent.options.address
    await new Promise(async (ok) => {
      var set = async () => {
        try {
          var key = web3.utils.sha3(
            await sendAsync(
              method._parent.currentProvider,
              'eth_getCode',
              address,
              'latest'
            )
          )
          if (!key) {
            setTimeout(set)
          }
          ;(global.compiledContracts = global.compiledContracts || {})[key] = {
            name: method._parent.name,
            abi: method._parent.abi,
          }
        } catch (e) {}
        return ok()
      }
      setTimeout(set)
    })
    return method._parent
  }
  return result
}

export default blockchainCall
