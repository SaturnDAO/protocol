import type Web3 from 'web3';
import type { AbiItem } from 'web3-utils';
import type { Exchange } from './types/Exchange'

export declare const abi: AbiItem[];
export declare const bytecode: string;

export type { EventOptions, Exchange, Mined, NewOrder, OrderCancelled, OrderFulfilled, Trade } from './types/Exchange';
export type { ERC20 } from './types/ERC20';

/**
 * creates a typed Exchage Contract instance
 * @param web3 {Web3}
 * @param contractAddress {string}
 * @returns
 */
export declare function create(web3: Web3, contractAddress: string): Exchange;
