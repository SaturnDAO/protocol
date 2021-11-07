const Web3 = require('web3')
const { abi, bytecode } = require('./abis/Exchange.json')
const mimas = require('./abis/Exchange.json')

exports.abi = abi
exports.bytecode = bytecode
exports.version = '0.0.2'

/**
 * Returns a typed Exchange Contract
 * @param contractAddress {string}
 * @param web3 {Web3}
 */
function create(contractAddress, web3 ) {
  if (typeof web3 === 'undefined') web3 = new Web3()

  const oldExchanges = [
    '0x3ec00ee8a4fbe81e7eea328029ce490654e8e11a',
    '0xa4632e7e8c8559ce094394adea72efc4cb3d2c87'
  ]

  if (typeof contractAddress !== 'undefined' &&['mimas', 'enceladus', 'latest'].concat(oldExchanges).includes(contractAddress.toLowerCase())) {
    if (contractAddress === 'mimas') contractAddress = '0xa4632e7e8c8559ce094394adea72efc4cb3d2c87'
    if (contractAddress === 'enceladus') contractAddress = '0x3ec00ee8a4fbe81e7eea328029ce490654e8e11a'
    if (contractAddress === 'latest') contractAddress = '0x5ef83ab1155786f146c5a00722bef7ab683dc0de'

    return new web3.eth.Contract(mimas.abi, contractAddress)
  } else {
    return new web3.eth.Contract(abi, contractAddress || '0x5ef83ab1155786f146c5a00722bef7ab683dc0de')
  }
}

exports.create = create

exports.contracts = {
  _web3: new Web3(),
  etc: {
    latest: {
      address: '0x5ef83ab1155786f146c5a00722bef7ab683dc0de',
      startblock: 0, abi: abi
    },
    enceladus: {
      address: '0x3ec00ee8a4fbe81e7eea328029ce490654e8e11a',
      startblock: 0, abi: mimas.abi
    },
    mimas: {
      address: '0xa4632e7e8c8559ce094394adea72efc4cb3d2c87',
      startblock: 0, abi: mimas.abi
    }
  },
  create (contractAddress, web3) {
    if (typeof web3 === 'undefined') web3 = web3 || this._web3 || new Web3()
    return exports.create(contractAddress, web3)
  },
  set web3 (web3) {
    this._web3 = web3
  },
  get web3 () {
    return this._web3
  }
}

exports.isOrder = function (obj) {
  return (
    'active' in obj && 'balance' in obj && 'type' in obj && 'order_id' in obj
  )
}