import * as assert from 'assert';
import * as bitcoin from '../';
import { Input, Output, signBSV } from '../src/bitcoin-sv';

describe('Bitcoin SV', () => {
  it('can sign 1-to-1 Transaction', () => {
    const alice = bitcoin.ECPair.fromWIF(
      'L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr',
    );
    if (alice.privateKey === undefined) {
      throw new Error(`Empty private key: ${JSON.stringify(alice)}`);
    }
    const inputs: Input[] = [
      {
        txId:
          '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
        index: 1,
        address: '12cyVmfJVwkBA4MUSUDarUL2jXiM98JEoe',
        script: '76a91411c5d84f5eca47921b0b92042de543f209c301a188ac',
        amount: 100,
      },
    ];
    const outputs: Output[] = [
      {
        address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
        amount: 100,
      },
    ];
    const hash = signBSV({
      inputs,
      outputs,
      sum: 100,
      fee: 0,
      privateKey: alice.privateKey,
    });
    assert.strictEqual(
      hash,
      '054d33e55730dace832f5ee5d7dcb7ee59fea9ee7f0aa129e63d4a0bad41391a',
    );
  });
});
