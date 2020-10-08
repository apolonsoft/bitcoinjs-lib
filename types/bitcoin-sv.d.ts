import * as bsv from 'bsv';
export interface Input {
    txId: string;
    index: number;
    address: string;
    script: string;
    amount: number;
}
export interface Output {
    address: Buffer | Uint8Array | string;
    amount: number;
    network?: bsv.Networks.Network;
}
export declare function signBSV(data: {
    inputs: Input[];
    outputs: Output[];
    fee: number;
    sum: number;
    privateKey: Buffer | string;
}): string;
