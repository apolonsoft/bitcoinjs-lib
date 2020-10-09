// @ts-ignore
import {
  Address,
  Networks,
  PrivateKey,
  PublicKey,
  Script,
  Transaction,
} from 'bitcore-lib-cash';

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

function convertInput(input: Input): Transaction.UnspentOutput {
  return new Transaction.UnspentOutput({
    txId: input.txId,
    outputIndex: input.index,
    address: input.address,
    script: input.script,
    satoshis: input.amount,
  });
}

function convertOutput(
  output: Output,
): {
  address: Buffer | Uint8Array | string;
  satoshis: number;
  network?: Networks.Network;
} {
  return {
    address: output.address,
    satoshis: output.amount,
    network: output.network,
  };
}

function getKeysAsArrays(
  keyPairs: KeyPair[],
): { publicKeys: PublicKey[]; privateKeys: PrivateKey[] } {
  const publicKeys: PublicKey[] = [];
  const privateKeys: PrivateKey[] = [];
  keyPairs.forEach(pair => {
    const privateKey =
      typeof pair.privateKey === 'string'
        ? PrivateKey.fromWIF(pair.privateKey)
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
export function createScript(
  data: string | Buffer | Buffer[],
  threshold?: number,
): string {
  let script;
  if (Array.isArray(data) && threshold !== undefined) {
    // p2ms
    const publicKeys: PublicKey[] = data.map(key => PublicKey.fromBuffer(key));
    script = Script.buildMultisigOut(publicKeys, threshold);
  } else if (data instanceof Buffer) {
    // p2pk
    const publicKey = PublicKey.fromBuffer(data);
    script = Script.buildPublicKeyOut(publicKey);
  } else if (typeof data === 'string') {
    // p2pkh
    script = Script.fromAddress(data);
  } else {
    throw new Error(`Unknown data type: ${JSON.stringify(data)}`);
  }
  return script.toHex();
}

export function signBSV(data: {
  inputs: Input[];
  outputs: Output[];
  sum: number;
  fee: number;
  keyPairs: KeyPair[];
}): string {
  const utxos = data.inputs.map(convertInput);
  const addresses = data.outputs.map(convertOutput);
  const { privateKeys } = getKeysAsArrays(data.keyPairs);
  const transaction = new Transaction();
  transaction
    .from(utxos)
    .to(addresses, data.sum)
    .fee(data.fee)
    .sign(privateKeys);
  return transaction.serialize();
}
