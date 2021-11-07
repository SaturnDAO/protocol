const { join } = require('path')
const {
  writeFileSync, readFileSync,
  readdirSync, existsSync, mkdirSync
} = require('graceful-fs')

const distfolder = join(process.cwd())
const buildfolder = join(process.cwd(), 'build/contracts')
const abifolder = join(process.cwd(), 'abis')

if (!existsSync(distfolder) || !existsSync(buildfolder)) process.exit(2)
if (!existsSync(abifolder)) mkdirSync(abifolder)

const files = {}

if (existsSync(buildfolder)) for (const file of readdirSync(buildfolder)) {
  const filepath = join(buildfolder, file)
  const filedata = readFileSync(filepath, 'utf-8')
  const { contractName, abi, bytecode } = JSON.parse(filedata)
  files[contractName] = { contractName, abi, bytecode }
  writeFileSync(join(abifolder, file), JSON.stringify(files[contractName], null, ' '))
  console.log(`ABI Interfaces created`, file)
}

/**
 * adding LogParams to generated files
 * ```ts
 * export declare type NewOrderLogParams = NewOrder['returnValues']
 * export declare type TradeLogParams = Trade['returnValues']
 * export declare type OrderCancelledLogParams = OrderCancelled['returnValues']
 * export declare type OrderFulfilledLogParams = OrderFulfilled['returnValues']
 * export declare type MinedLogParams = Mined['returnValues']
 * ```
 */