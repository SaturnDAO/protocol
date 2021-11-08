
const Web3 = require('web3')
const { isAddress } = require('web3-utils')
const { expect } = require('chai')
const { create, contracts } = require('..')

describe('Testing Contract', () => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  
  it('should query the treasury addres', async () => {
    const exchange = create('enceladus', web3)
    const treasury = await exchange.methods.treasury().call()
    expect(isAddress(treasury)).to.be.true
  })

  it('should error, because no provider is set', async () => {
    const hasNoWeb3 = contracts.create('enceladus')
    try {
      await hasNoWeb3.methods.treasury().call()
    }catch(error){
      expect(error).not.undefined
    }
  })

  it('should set web3 to deployed context', async () => {
    contracts.web3 = web3
    const hasNoWeb3 = contracts.create('mimas')
    const treasury = await hasNoWeb3.methods.treasury().call()
    expect(isAddress(treasury)).to.be.true
  })
})

  
  
  



