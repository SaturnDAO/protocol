/// <reference types="node" />
import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { Callback, NonPayableTransactionObject, BlockType, BaseContract } from "./types";
export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
}
export interface ERC20 extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): ERC20;
    clone(): ERC20;
    methods: {
        totalSupply(): NonPayableTransactionObject<string>;
        balanceOf(holder: string): NonPayableTransactionObject<string>;
        allowance(holder: string, other: string): NonPayableTransactionObject<string>;
        approve(other: string, amount: number | string | BN): NonPayableTransactionObject<boolean>;
        transfer(to: string, amount: number | string | BN): NonPayableTransactionObject<boolean>;
        transferFrom(from: string, to: string, amount: number | string | BN): NonPayableTransactionObject<boolean>;
    };
    events: {
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
}
