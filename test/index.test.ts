import Web3 from 'web3'
import { create, contracts } from '..'

const web3 = new Web3()

contracts.create(web3)

const exchange = contracts.create()
const enceladus = contracts.create('enceladus')
const mimas = contracts.create('mimas')
const latest = contracts.create('latest')

console.log({
  exchange: exchange.options.address,
  mimas: mimas.options.address,
  enceladus: enceladus.options.address,
  latest: latest.options.address
})

console.log(contracts.etc.mimas.address)

console.log(create('latest').options.address)