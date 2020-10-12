/// <reference types="node" />
import { Address, Networks, PrivateKey, PublicKey } from 'bitcore-lib-cash';
export interface Input {
    txId: string;
    index: number;
    address: Address;
    script: string;
    amount: number;
}
export interface Output {
    address: string;
    amount: number;
    network?: Networks.Network;
}
export interface KeyPair {
    publicKey?: PublicKey;
    privateKey: PrivateKey | string;
}
/**
 * @description Create script and returns its HEX
 * @see https://docs.moneybutton.com/docs/bsv-script.html
 * @param data {string | Buffer | Buffer[]} must be either an address or
 *  a buffer array of public keys or one public key buffer
 * @param [threshold] {number} the number of required signatures in the Multisig script.
 */
export declare function createScript(data: string | Buffer | Buffer[], threshold?: number): string;
export declare function signBSV(data: {
    inputs: Input[];
    outputs: Output[];
    sum: number;
    fee: number;
    keyPairs: KeyPair[];
}): string;
