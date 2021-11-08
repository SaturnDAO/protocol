const { join } = require('path')
const {
  readFileSync,
  existsSync,
  appendFileSync
} = require('graceful-fs')

const LOG_PARAMS = `

// Params of parsed Event Logs (AbiDecoder)

/** NewOrder LogParams */
export declare type NewOrderLogParams = NewOrder['returnValues']

/** NewOrder LogParams */
export declare type TradeLogParams = Trade['returnValues']

/** NewOrder LogParams */
export declare type OrderCancelledLogParams = OrderCancelled['returnValues']

/** NewOrder LogParams */
export declare type OrderFulfilledLogParams = OrderFulfilled['returnValues']

/** NewOrder LogParams */
export declare type MinedLogParams = Mined['returnValues']
`

const typesfolder = join(process.cwd(), 'types')

if (!existsSync(typesfolder)) process.exit(0)


for (const ContractName of ['Exchange', 'Mimas']) {
  const typesfile = join(typesfolder, ContractName + '.d.ts')
  if (!existsSync(typesfile)) continue
  if (readFileSync(typesfile, 'utf-8').includes(`NewOrderLogParams`)) continue
  appendFileSync(typesfile, LOG_PARAMS)
  console.log(`ADDED LOG PARAMS ON CONTRACT ${ContractName}`)
}
