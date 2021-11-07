const { abi, bytecode } = require('./abis/Exchange.json')

exports.abi = abi
exports.bytecode = bytecode

/**
 * Returns a typed Exchange Contract
 * @param web3 {Web3}
 * @param contractAddress {string}
 * @returns
 */
 function create(web3, contractAddress) {
  var x = new web3.eth.Contract(abi, contractAddress);
  return x;
}

exports.create = create