// @ts-ignore
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

function convertInput(input: Input): bsv.Transaction.UnspentOutput {
  return new bsv.Transaction.UnspentOutput({
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
  network?: bsv.Networks.Network;
} {
  return {
    address: output.address,
    satoshis: output.amount,
    network: output.network,
  };
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

export function signBSV(data: {
  inputs: Input[];
  outputs: Output[];
  fee: number;
  sum: number;
  privateKey: Buffer | string;
}): string {
  const utxos = data.inputs.map(convertInput);
  const addresses = data.outputs.map(convertOutput);
  const transaction = new bsv.Transaction();
  transaction
    .from(utxos)
    .to(addresses, data.sum)
    .fee(data.fee)
    .sign(data.privateKey);
  return transaction.hash;
}
