import * as assert from 'assert';
import { PrivateKey } from 'bitcore-lib-cash';
import { createScript, Input, Output, signBSV } from '../src/bitcoin-sv';

describe('Bitcoin SV', () => {
  let Alice: PrivateKey;

  beforeEach(() => {
    Alice = PrivateKey.fromWIF(
      'cQw6mUssbDBRGsbenK4EzBokXRdjSRyyb59NDCr3n6RceZA9JDP9',
    );
    if (!Alice.toString()) {
      throw new Error(`Empty private key: ${JSON.stringify(Alice)}`);
    }
  });

  describe('correct transactions', () => {
    it('can sign 1-to-1 p2pkh', () => {
      const script = createScript(Alice.toAddress().toString());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 5000,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 4800,
        },
      ];
      const hash = signBSV({
        inputs,
        outputs,
        sum: 10000,
        fee: 200,
        keyPairs: [
          {
            privateKey: Alice,
            publicKey: Alice.toPublicKey(),
          },
        ],
      });
      assert.strictEqual(
        hash,
        '02000000015096f5db71c58247d43a9ac3447d616e447158aebff5409cb18eca6e0eee0f60000000006a47304402203edb84bdbd7d31447b548a68b0bda8f392f0788b338e2f3207a008efe47fe704022027ca1748301e5ce39f80d6dc36e3f599d94f46c9d14871821ce5738087db7b87412103eaf60473bb5042b11ebdc33cd514ddeb4d1225aa9c1abe20a34ed8cc28fbce1cffffffff0288130000000000001976a914243f1394f44554f4ce3fd68649c19adc483ce92488acc0120000000000001976a914563c4a3628b75f00e4fe522a4a637923bb23e31788ac00000000',
      );
    });

    it('can sign 1-to-1 p2pkh via keys as WIF string', () => {
      const script = createScript(Alice.toAddress().toString());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 5000,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 4800,
        },
      ];
      const hash = signBSV({
        inputs,
        outputs,
        sum: 10000,
        fee: 200,
        keyPairs: [
          {
            privateKey: 'cQw6mUssbDBRGsbenK4EzBokXRdjSRyyb59NDCr3n6RceZA9JDP9',
          },
        ],
      });
      assert.strictEqual(
        hash,
        '02000000015096f5db71c58247d43a9ac3447d616e447158aebff5409cb18eca6e0eee0f60000000006a47304402203edb84bdbd7d31447b548a68b0bda8f392f0788b338e2f3207a008efe47fe704022027ca1748301e5ce39f80d6dc36e3f599d94f46c9d14871821ce5738087db7b87412103eaf60473bb5042b11ebdc33cd514ddeb4d1225aa9c1abe20a34ed8cc28fbce1cffffffff0288130000000000001976a914243f1394f44554f4ce3fd68649c19adc483ce92488acc0120000000000001976a914563c4a3628b75f00e4fe522a4a637923bb23e31788ac00000000',
      );
    });

    it('can sign 1-to-1 p2pk', () => {
      const script = createScript(Alice.toPublicKey().toBuffer());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 5000,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 4800,
        },
      ];
      const hash = signBSV({
        inputs,
        outputs,
        sum: 10000,
        fee: 200,
        keyPairs: [
          {
            privateKey: Alice,
            publicKey: Alice.toPublicKey(),
          },
        ],
      });
      assert.strictEqual(
        hash,
        '02000000015096f5db71c58247d43a9ac3447d616e447158aebff5409cb18eca6e0eee0f600000000049483045022100e60562f4155c8d22abf84cc42bffe68dcfc124b984b94fcdd693c12dc374fba6022054e1f2392eced52faa3d9231609cb92a727c88b2b66093423b1cf18752e0848541ffffffff0288130000000000001976a914243f1394f44554f4ce3fd68649c19adc483ce92488acc0120000000000001976a914563c4a3628b75f00e4fe522a4a637923bb23e31788ac00000000',
      );
    });

    it('can sign 1-to-2 p2pkh', () => {
      const script = createScript(Alice.toAddress().toString());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 2500,
        },
        {
          address: 'mu8AtN3VmPMVkREoyJwwD7CmPe9coyNQnB',
          amount: 2500,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 4500,
        },
      ];
      const hash = signBSV({
        inputs,
        outputs,
        sum: 10000,
        fee: 500,
        keyPairs: [
          {
            privateKey: Alice,
            publicKey: Alice.toPublicKey(),
          },
        ],
      });
      assert.strictEqual(
        hash,
        '02000000015096f5db71c58247d43a9ac3447d616e447158aebff5409cb18eca6e0eee0f60000000006a473044022078b63fcc9c8bb91d4b7564e7d74c79c815b895a81cd42a2ea1e61b712b970b200220268fcf176682315d930f87445e13a41995a3a5d2e7cacd8b41dd453d734a0c80412103eaf60473bb5042b11ebdc33cd514ddeb4d1225aa9c1abe20a34ed8cc28fbce1cffffffff03c4090000000000001976a914243f1394f44554f4ce3fd68649c19adc483ce92488acc4090000000000001976a9149542b46a1c69492f906530605b33042b1e5ab0c988ac94110000000000001976a914563c4a3628b75f00e4fe522a4a637923bb23e31788ac00000000',
      );
    });

    it('can sign 2-to-1 p2pkh', () => {
      const Bob = PrivateKey.fromWIF(
        '5KZqXkHXsvvCe6MyjdNMH2Ejt2c2rpmpUDwn94iEjeuH3sXUZWt',
      );
      const script1 = createScript(Alice.toAddress().toString());
      const script2 = createScript(Bob.toAddress().toString());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script: script1,
          amount: 10000,
        },
        {
          txId:
            '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
          index: 1,
          address: Bob.toAddress(),
          script: script2,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 15000,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 4500,
        },
      ];
      const hash = signBSV({
        inputs,
        outputs,
        sum: 20000,
        fee: 500,
        keyPairs: [
          {
            privateKey: Alice,
          },
          {
            privateKey: Bob,
          },
        ],
      });
      assert.strictEqual(
        hash,
        '02000000025096f5db71c58247d43a9ac3447d616e447158aebff5409cb18eca6e0eee0f60000000006a473044022055f8e99e63a73f7b3100efcc5800840253c40fd842abeab34b08198f3ea4de5102202a267c76a42c4af100fab79f6489bf6cd8c6300746b6926c147ce6584f7057b8412103eaf60473bb5042b11ebdc33cd514ddeb4d1225aa9c1abe20a34ed8cc28fbce1cffffffff982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e010000008b483045022100e9f23273b0f5e3f921808f4b4fc7f32906ccffbe2798fe53bc7bd202daf1f80b02200a0f7fc7eea414fc697d52fd191cb8ca06999a9a037bfa838a2572918cfd20a141410473f9c088e75103834468b097be954b42255f5c6de686d902be02b751382e2d58430b11e2e8a25488491325a40cc181d3ea259e3fdd5f49b68d91b3760a29aae2ffffffff02983a0000000000001976a914243f1394f44554f4ce3fd68649c19adc483ce92488ac94110000000000001976a914563c4a3628b75f00e4fe522a4a637923bb23e31788ac00000000',
      );
    });

    it('can sign 2-to-2 p2pkh', () => {
      const Bob = PrivateKey.fromWIF(
        '5KZqXkHXsvvCe6MyjdNMH2Ejt2c2rpmpUDwn94iEjeuH3sXUZWt',
      );
      const script1 = createScript(Alice.toAddress().toString());
      const script2 = createScript(Bob.toAddress().toString());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script: script1,
          amount: 10000,
        },
        {
          txId:
            '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
          index: 1,
          address: Bob.toAddress(),
          script: script2,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 15000,
        },
        {
          address: 'mu8AtN3VmPMVkREoyJwwD7CmPe9coyNQnB',
          amount: 2500,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 2000,
        },
      ];
      const hash = signBSV({
        inputs,
        outputs,
        sum: 20000,
        fee: 500,
        keyPairs: [
          {
            privateKey: Alice,
          },
          {
            privateKey: Bob,
          },
        ],
      });
      assert.strictEqual(
        hash,
        '02000000025096f5db71c58247d43a9ac3447d616e447158aebff5409cb18eca6e0eee0f60000000006a473044022035ba3a5edefa792d80a60f5c9b7033e3fe84ac30d4fbc0845582a6f9e7e47e4e0220171a0e2c9eb38f4a05172b0e66a0344ab5c2142e6b8942e6d819468621858ec7412103eaf60473bb5042b11ebdc33cd514ddeb4d1225aa9c1abe20a34ed8cc28fbce1cffffffff982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e010000008b483045022100fafb5871a2bacc9e499ed474414d122736cf73a81a1f054955e51a57d65c0cec022026443470fb6107845de907fbc26313da5c24ace17207857af83791d85fc063f241410473f9c088e75103834468b097be954b42255f5c6de686d902be02b751382e2d58430b11e2e8a25488491325a40cc181d3ea259e3fdd5f49b68d91b3760a29aae2ffffffff03983a0000000000001976a914243f1394f44554f4ce3fd68649c19adc483ce92488acc4090000000000001976a9149542b46a1c69492f906530605b33042b1e5ab0c988acd0070000000000001976a914563c4a3628b75f00e4fe522a4a637923bb23e31788ac00000000',
      );
    });
  });

  describe('wrong transactions', () => {
    it('throws on incorrect fee (not enough money to pay fee)', () => {
      const script = createScript(Alice.toAddress().toString());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 5000,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 4800,
        },
      ];
      assert.throws(() => {
        signBSV({
          inputs,
          outputs,
          sum: 10000,
          fee: 300,
          keyPairs: [
            {
              privateKey: Alice,
              publicKey: Alice.toPublicKey(),
            },
          ],
        });
      });
    });

    it('throws on incorrect output element amount (not enough money to pay to the address)', () => {
      const script = createScript(Alice.toAddress().toString());
      const inputs: Input[] = [
        {
          txId:
            '600fee0e6eca8eb19c40f5bfae5871446e617d44c39a3ad44782c571dbf59650',
          index: 0,
          address: Alice.toAddress(),
          script,
          amount: 10000,
        },
      ];
      const outputs: Output[] = [
        {
          address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
          amount: 15000,
        },
        {
          address: Alice.toAddress().toString(),
          amount: 4800,
        },
      ];
      assert.throws(() => {
        signBSV({
          inputs,
          outputs,
          sum: 10000,
          fee: 200,
          keyPairs: [
            {
              privateKey: Alice,
              publicKey: Alice.toPublicKey(),
            },
          ],
        });
      });
    });
  });
});
