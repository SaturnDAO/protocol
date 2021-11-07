/// <reference types="node" />
import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { Callback, PayableTransactionObject, NonPayableTransactionObject, BlockType, ContractEventLog, BaseContract } from "./types";
export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
}
export declare type NewOrder = ContractEventLog<{
    id: string;
    owner: string;
    sellToken: string;
    buyToken: string;
    amount: string;
    priceMul: string;
    priceDiv: string;
    time: string;
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
}>;
export declare type OrderCancelled = ContractEventLog<{
    id: string;
    time: string;
    0: string;
    1: string;
}>;
export declare type OrderFulfilled = ContractEventLog<{
    id: string;
    time: string;
    0: string;
    1: string;
}>;
export declare type Trade = ContractEventLog<{
    from: string;
    to: string;
    orderId: string;
    soldTokens: string;
    boughtTokens: string;
    time: string;
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
}>;
export declare type Mined = ContractEventLog<{
    trader: string;
    amount: string;
    time: string;
    0: string;
    1: string;
    2: string;
}>;
export interface Mimas extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Mimas;
    clone(): Mimas;
    methods: {
        orderCount(): NonPayableTransactionObject<string>;
        getSellTokenAmount(buyTokenAmount: number | string | BN, orderId: number | string | BN): NonPayableTransactionObject<string>;
        cancelOrder(orderId: number | string | BN): NonPayableTransactionObject<void>;
        feeMul(): NonPayableTransactionObject<string>;
        treasury(): NonPayableTransactionObject<string>;
        tradeMiningMul(): NonPayableTransactionObject<string>;
        calcFees(amount: number | string | BN, orderId: number | string | BN): NonPayableTransactionObject<string>;
        remainingAmount(orderId: number | string | BN): NonPayableTransactionObject<string>;
        feeDiv(): NonPayableTransactionObject<string>;
        buyOrderWithEth(orderId: number | string | BN): PayableTransactionObject<void>;
        tokenFallback(from: string, value: number | string | BN, data: string | number[]): NonPayableTransactionObject<void>;
        tradeMiningAmount(fees: number | string | BN, orderId: number | string | BN): NonPayableTransactionObject<string>;
        tradeMiningBalance(): NonPayableTransactionObject<string>;
        sellEther(buyToken: string, priceMul: number | string | BN, priceDiv: number | string | BN): PayableTransactionObject<string>;
        getBalance(token: string, user: string): NonPayableTransactionObject<string>;
        isOrderActive(orderId: number | string | BN): NonPayableTransactionObject<boolean>;
        withdrawTradeMining(): NonPayableTransactionObject<void>;
        tradeMiningDiv(): NonPayableTransactionObject<string>;
        getBuyTokenAmount(desiredSellTokenAmount: number | string | BN, orderId: number | string | BN): NonPayableTransactionObject<string>;
    };
    events: {
        NewOrder(cb?: Callback<NewOrder>): EventEmitter;
        NewOrder(options?: EventOptions, cb?: Callback<NewOrder>): EventEmitter;
        OrderCancelled(cb?: Callback<OrderCancelled>): EventEmitter;
        OrderCancelled(options?: EventOptions, cb?: Callback<OrderCancelled>): EventEmitter;
        OrderFulfilled(cb?: Callback<OrderFulfilled>): EventEmitter;
        OrderFulfilled(options?: EventOptions, cb?: Callback<OrderFulfilled>): EventEmitter;
        Trade(cb?: Callback<Trade>): EventEmitter;
        Trade(options?: EventOptions, cb?: Callback<Trade>): EventEmitter;
        Mined(cb?: Callback<Mined>): EventEmitter;
        Mined(options?: EventOptions, cb?: Callback<Mined>): EventEmitter;
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    once(event: "NewOrder", cb: Callback<NewOrder>): void;
    once(event: "NewOrder", options: EventOptions, cb: Callback<NewOrder>): void;
    once(event: "OrderCancelled", cb: Callback<OrderCancelled>): void;
    once(event: "OrderCancelled", options: EventOptions, cb: Callback<OrderCancelled>): void;
    once(event: "OrderFulfilled", cb: Callback<OrderFulfilled>): void;
    once(event: "OrderFulfilled", options: EventOptions, cb: Callback<OrderFulfilled>): void;
    once(event: "Trade", cb: Callback<Trade>): void;
    once(event: "Trade", options: EventOptions, cb: Callback<Trade>): void;
    once(event: "Mined", cb: Callback<Mined>): void;
    once(event: "Mined", options: EventOptions, cb: Callback<Mined>): void;
}
