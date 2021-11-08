const Web3 = require('web3')
const { create, contracts, isOrder, isTradebook } = require('..')
const web3 = new Web3(new Web3.providers.HttpProvider(
  'http://localhost:8545'
))

const exchange = create('enceladus', web3)

exchange.methods.treasury().call().then(async treasury => {
  const hasNoWeb3 = contracts.create('enceladus')

  await hasNoWeb3.methods
    .treasury().call()
    .then(() => console.log(`enceladus done`))
    .catch(async (error) => {
      console.error(`sucess, enceladus errored`, error['message'])

      // setting web3 to context
      contracts.web3 = web3
      console.log('did set web3 to deployed context', contracts.web3.version)

      // spawing new exchange contract, now web3 will be set by default
      await contracts.create('mimas').methods.treasury().call()
        .then(() => console.log(`chimas done`))
        .catch((error) => console.error(`chimas error`, error))
    })
})
  
  
  



