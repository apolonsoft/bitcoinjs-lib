'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// @ts-ignore
const bsv = require('bsv');
function convertInput(input) {
  return new bsv.Transaction.UnspentOutput({
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
function signBSV(data) {
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
exports.signBSV = signBSV;
