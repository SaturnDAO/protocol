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
export interface ContractReceiver extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): ContractReceiver;
    clone(): ContractReceiver;
    methods: {
        tokenFallback(_from: string, _value: number | string | BN, _data: string | number[]): NonPayableTransactionObject<void>;
    };
    events: {
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
}
