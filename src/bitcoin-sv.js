"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const bitcore_lib_cash_1 = require("bitcore-lib-cash");
function convertInput(input) {
    return new bitcore_lib_cash_1.Transaction.UnspentOutput({
        txId: input.txId,
        outputIndex: input.index,
        address: input.address,
        script: input.script,
        satoshis: input.amount,
    });
}
function convertOutput(output) {
    return {
        address: output.address,
        satoshis: output.amount,
        network: output.network,
    };
}
function getKeysAsArrays(keyPairs) {
    const publicKeys = [];
    const privateKeys = [];
    keyPairs.forEach(pair => {
        const privateKey = typeof pair.privateKey === 'string'
            ? bitcore_lib_cash_1.PrivateKey.fromWIF(pair.privateKey)
            : pair.privateKey;
        privateKeys.push(privateKey);
        publicKeys.push(privateKey.toPublicKey());
    });
    return { publicKeys, privateKeys };
}
// function applyOutputs(outputs: Output[]): { addresses: bsv.Address[], sum: number } {
//   const addresses: bsv.Address[] = [];
//   let sum = 0;
//   outputs.forEach(output => {
//     addresses.push({
//       address: output.address,
//       satoshis: output.amount,
//       network: output.network,
//     });
//     sum += output.amount;
//   });
//   return { addresses, sum };
// }
/**
 * @description Create script and returns its HEX
 * @see https://docs.moneybutton.com/docs/bsv-script.html
 * @param data {string | Buffer | Buffer[]} must be either an address or
 *  a buffer array of public keys or one public key buffer
 * @param [threshold] {number} the number of required signatures in the Multisig script.
 */
function createScript(data, threshold) {
    let script;
    if (Array.isArray(data) && threshold !== undefined) {
        // p2ms
        const publicKeys = data.map(key => bitcore_lib_cash_1.PublicKey.fromBuffer(key));
        script = bitcore_lib_cash_1.Script.buildMultisigOut(publicKeys, threshold);
    }
    else if (data instanceof Buffer) {
        // p2pk
        const publicKey = bitcore_lib_cash_1.PublicKey.fromBuffer(data);
        script = bitcore_lib_cash_1.Script.buildPublicKeyOut(publicKey);
    }
    else if (typeof data === 'string') {
        // p2pkh
        script = bitcore_lib_cash_1.Script.fromAddress(data);
    }
    else {
        throw new Error(`Unknown data type: ${JSON.stringify(data)}`);
    }
    return script.toHex();
}
exports.createScript = createScript;
function signBSV(data) {
    const utxos = data.inputs.map(convertInput);
    const addresses = data.outputs.map(convertOutput);
    const { privateKeys } = getKeysAsArrays(data.keyPairs);
    const transaction = new bitcore_lib_cash_1.Transaction();
    transaction
        .from(utxos)
        .to(addresses, data.sum)
        .fee(data.fee)
        .sign(privateKeys);
    return transaction.serialize();
}
exports.signBSV = signBSV;
