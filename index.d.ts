import type Web3 from 'web3';
import type { Contract } from 'web3-eth-contract'
import type { AbiItem } from 'web3-utils';
import type { Exchange } from './types/Exchange'
import type { Mimas } from './types/Mimas'

export declare const abi: AbiItem[];
export declare const bytecode: string;
export declare const version: string;

export type { Exchange } from './types/Exchange';

/**
 * Old implementation of Saturn Protocol.
 * Supports `Enceladus` and `Mimas` contract
 */
export type { Mimas } from './types/Mimas';

export declare function create(): Exchange;
export declare function create(web3: Web3): Exchange;
export declare function create(contractAddress: string): Exchange;
export declare function create(contractAddress: '0x5EF83Ab1155786f146c5A00722bEF7aB683Dc0DE', web3?: Web3 ): Exchange;
export declare function create(contractAddress: '0x3EC00Ee8a4fbE81e7eeA328029ce490654e8e11a', web3?: Web3 ) : Mimas;
export declare function create(contractAddress: '0xA4632e7e8c8559CE094394adEa72EFC4Cb3D2c87', web3?: Web3 ): Mimas;
export declare function create(contractAddress: 'latest', web3?: Web3 ): Exchange;
export declare function create(contractAddress: 'enceladus', web3?: Web3 ): Mimas;
export declare function create(contractAddress: 'mimas', web3?: Web3 ): Mimas;

export declare function isOrder(obj: any): obj is Order
export interface DeployedInformation {
  address: string, startblock: number, abi: AbiItem[]
}

export declare const contracts: {
  etc: {
    latest: DeployedInformation;
    enceladus: DeployedInformation;
    mimas: DeployedInformation;
  };
  create: typeof create;
  web3: Web3;
}

/**
 * creates a typed Exchage Contract instance
 * @param web3 {Web3}
 * @param contractAddress {string}
 * @returns
 */
export declare function create(contractAddress: string, web3?: Web3): Exchange;


export type Blockchains = 'ETC' | 'ETH' | 'PHX' | 'DAO' | 'AOA' | 'AOAT'
export type TokenStandard = 'ERC223' | 'ERC20' | 'ERC721'
export type LogFunction = (...values: any) => void

export type ExchangeEventNames = 'NewOrder' | 'Trade' | 'OrderCancelled' | 'Mined' | 'OrderFulfilled'
export type OrderType = 'BUY' | 'SELL'

export interface Orderbook {
  sells: Order[]
  buys: Order[]
}

export interface Tradebook {
  buys: Trade[]
  sells: Trade[]
}

export interface Order {
  /** Is the order active (available for trading) or not (cancelled or filled). Either `true` or `false`. */
  active: boolean
  /** Available order balance, denominated in tokens. */
  balance: string
  /** What blockchain does the order belong to. */
  blockchain: Blockchains
  /** Describes at what block number was the order created. */
  blocknumber: number
  /** Short summary of order’s buy token. */
  buytoken: TokenSummary
  /** Short summary of order’s sell token. */
  selltoken: TokenSummary
  /** Saturn Network DEX is a dApp that runs across multiple smart contracts and multiple blockchains. This field indicates the address of the exchange smart contract. */
  contract: string
  /** A UNIX timestamp of the transaction that created the order. */
  created_at: number
  /** A UNIX timestamp of the last update of the order. */
  updated_at: number
  /** The id of the order, as issued by the exchange smart contract. */
  order_id: number
  /** The address that created this order. */
  owner: string
  /** Order price. */
  price: string
  /** Etherbalance of given Order */
  etherbalance: string
  /** Transaction hash of the transaction that created the order. */
  transaction: string
  /** Must be either BUY or SELL. */
  type: string | OrderType
  /** RING - ETH Only */
  ring?: string
  /** Trades of Given Order */
  trades?: Trade[]
}

export interface TokenSummary {
  /** token’s address. */
  address: string
  /** token’s decimals. */
  decimals: number
  /** token’s full name. */
  name: string
  /** token’s symbol. */
  symbol: string
  /** last known token’s total supply. This value is not available for native ether (i.e. ETH on Ethereum blockchain and ETC on Ethereum Classic blockchain). For tokens with fluctuating total supply, such as GasToken, this value gets updated on every trade. For those tokens this value can be an effective approximation of token’s circulating supply. */
  totalSupply?:string
}

export interface Trade {
  /** What blockchain does the trade belong to. */
  blockchain: Blockchains
  /** Describes at what block number was the trade created. */
  blocknumber: number
  /** The address of the buyer. */
  buyer: string
  /** The address of the seller (order owner). */
  seller: string
  /** Address of the entity that received trade mining rewards. Currently same as buyer. */
  trade_miner_address?: string
  /** Short summary of order’s buy token. */
  buytoken: TokenSummary
  /** Short summary of order’s sell token. */
  selltoken: TokenSummary
  /** How many tokens were bought. */
  buytokenamount: string
  /** How many tokens were sold. */
  selltokenamount: string
  /** Saturn Network DEX is a dApp that runs across multiple smart contracts and multiple blockchains. This field indicates the address of the exchange smart contract. */
  contract: string
  /** The id of the order, as issued by the exchange smart contract. */
  order_id: number
  /** Address that created the order. */
  order_owner: string
  /** A UNIX timestamp of the transaction that created the trade. */
  created_at: number
  /** Transaction that created the order. */
  order_tx: string
  /** Must be either BUY or SELL. */
  order_type: string
  /** Order price */
  price: string
  /** How many SATURN tokens were mined via this trade. */
  trademiningamount?: string | null
  /** Transaction hash of the transaction that created the trade. */
  transaction: string
  /** Paid fess - only display after Enceladus Contracts */
  fee_paid?: string
  /** UNIX Timestamp of Trade */
  time?: number
  /** RING - ETH Only */
  liquidity_provider?: 'saturn' | string
  suspicious?: boolean
}

export interface ExchangeStats {
  contract: string,
  tradeCount: number,
  activeOrders: number
  totalMined: string
  totalFeesPaid: string
}

export interface LiquidityDepth {
  ether: string;
  tokens: string;
}

export interface DetailedTokenSummary extends TokenSummary {
  updated_at: number;
  /** token’s blockchain. */
  blockchain: Blockchains;
  /** 	the `id` of the best buy order (buy order with the highest price). This is the `id` that is returned by the exchange smart contract when the order is created, and is the `id` that you should use when you want to create a transaction to trade against said order. */
  best_buy_order: string;
  /** the price of the best buy order. */
  best_buy_price: string;
  /** the transaction that created the best buy order. */
  best_buy_order_tx: string;
  /** the `id` of the best sell order (buy order with the lowest price). This is the `id` that is returned by the exchange smart contract when the order is created, and is the `id` that you should use when you want to create a transaction to trade against said order. */
  best_sell_order?: any;
  /** the price of the best sell order. */
  best_sell_price?: any;
  /** the transaction that created the best sell order. */
  best_sell_order_tx?: any;
  /** token’s trade volume over last 24 hours, measure in blockchain’s native ether. In this case 1.32 ETC. */
  volume24hr: string;
    /** weighted average price, selected by looking at the trades that happened within last 24 hours. */
  price24hr: string;
  /** weighted average price over last 10 buys and last 10 sells, an approximation of token’s fair market price. */
  dashboard_price: string;
  /** shows how much the token’s price changed over last 24 hours. Note that this API returns a fraction, not a percentage, so you need to multiply by `100` yourself. In this case, the token is up 35.38%. */
  change_pct: string;
  /** shows how much liquidity is available for this token, locked into buy and sell orders. In this case, there is 38.20525 ETC and 2536870.0702 SATURN available. */
  liquidity_depth: LiquidityDepth;
  /** ETH only */
  atomic_enabled?: boolean;
  token_standard?: TokenStandard
}

export interface Sparkline {
  day: string;
  price: string;
  volume: string;
  quoteVolume: string;
}

export interface Dashbaord {
  token: DetailedTokenSummary;
  sparkline: Sparkline[];
}

export interface OHLCV {
  close: string;
  high: string;
  low: string;
  open: string;
  time: number;
  volume: string;
}

export interface TokenBalance extends TokenSummary {
  balance: string
  balanceParsed: string
} 

export interface TraderSummary {
  address: string
  nonce: number
  chainId: number
  balance: string
  balanceParsed: string
  tokens: TokenBalance[]
  orders?: Order[]
  trades?: Tradebook
}
export interface ExchangeSetting {
  // dev
  [index: string]: any;
  contractAddress: string;
  startBlock: number;
  deployHash?: string
  deployer?: string
  delployTime?: string
  name: string;
  abi: any;
  blockchain: Blockchains
  description?: string
  topics: {
    newOrder: string;
    orderCancelled: string;
    trade: string;
    mined: string;
  }
}

export interface SaturnLowLevelApi {
  /** Returns a Web3 Token Contract instance `(ERC20/ERC223)` */
  createTokenContract: (tokenAddress: string) => Contract | Exchange;
  /** Returns a Web3 Exchange Contract instance */
  createExchangeContract: (exchangeAddress: string) => Contract | Exchange;
  /** Return current `ExchangeSetting[]` */
  getExchangeSettings: () => ExchangeSetting[];
  /** Returns an array of all active Exchange Contract addresses */
  getExchangeAddresses: () => string[];
  /** Returns the total amount of trademined Saturn and total Trades seen */
  getTotalMined: ({ trader, exchangeAddress, blockchain }?: any) => Promise<any>;
  /** Returns Exchange Statistics (beta) */
  getExchangeStats: () => Promise<any>;
  getTrader: (address: string) => Promise<TraderSummary>;
  /** Returns an array of all seen Traders */
  getTraderList: () => Promise<string[]>;
  /** Returns parsed TokenInfo */
  getTokenInfo: (address: string) => Promise<TokenSummary>;
  /** Returns details of all tokens known to the API. Whenever a token is traded on the exchange, or is airdropped through the airdrop-tool, a record about this token gets inserted in the database. */
  getListedTokens: (parseTokenInfo?: boolean) => Promise<string[] | TokenSummary[]>;
  /** Returns all active orders for a given token */
  getOrderbook: (tokenAddress: string, includeTrades?: boolean) => Promise<Orderbook>;
  /** Returns a summary of a given order. */
  getOrder: (orderTag: string | number, includeTrades?: boolean) => Promise<Order>;
  /** Returns most recently created orders. Useful for developing a live feed of all new orders entering the system. */
  getRecentOrders: (limit?: number, token?: string) => Promise<Order[]>;
  /** Returns most recent trades. (default 20) */
  getRecentTrades: (limit?: number) => Promise<Trade[]>;
  /** Returns Recent Trades by Given Token */
  getRecentTradesByToken: (token: string, limit?: number, direction?: 'DESC' | 'ASC') => Promise<Trade[]>;
  /** Returns all trades for a given trader address. */
  getOrdersByTrader: (traderAddress: string, token?: string) => Promise<Order[]>;
  /** Returns a summary of a given trade. */
  getTrade: (txHash: string) => Promise<Trade>;
  /** Returns all trades for a given trader address. */
  getTradesByTrader: (traderAddress: string, token?: string) => Promise<Tradebook>;
  getOhlcv: (token: string, options?: any) => Promise<OHLCV[]>;
  getRSI: (token: string, options?: any) => Promise<number>;
  /**
   * Creates DetailedTokenSummary
   *
   * Some functions are not done yet.
   */
  getDetailedTokenSummary: (token: string) => DetailedTokenSummary;
  getMined: ({ trader, exchangeAddress, blockchain }?: any) => Promise<Trade[]>;
  tokenlist: () => Promise<DetailedTokenSummary[]>
}