import * as assert from 'assert';
import { describe, it } from 'mocha';
import { networkConfig, NetworkConfig } from '../src/networks';
import * as bscript from '../src/script';
import { Transaction } from '../src/transaction';
import * as fixtures from './fixtures/transaction.json';

describe('Transaction', () => {
  function fromRaw(f: any, noWitness?: boolean): Transaction {
    const raw = f.raw;
    const key: keyof NetworkConfig = f.network;
    const tx = new Transaction(networkConfig[key]);

    tx.version = raw.version;
    tx.time = raw.time;
    tx.locktime = raw.locktime;

    raw.ins.forEach((txIn: any, i: number) => {
      const txHash = Buffer.from(txIn.hash, 'hex');
      let scriptSig;

      if (txIn.data) {
        scriptSig = Buffer.from(txIn.data, 'hex');
      } else if (txIn.script) {
        scriptSig = bscript.fromASM(txIn.script);
      }

      tx.addInput(txHash, txIn.index, txIn.sequence, scriptSig);

      if (!noWitness && txIn.witness) {
        const witness = txIn.witness.map((x: string) => {
          return Buffer.from(x, 'hex');
        });

        tx.setWitness(i, witness);
      }
    });

    raw.outs.forEach((txOut: any) => {
      let script: Buffer;

      if (txOut.data) {
        script = Buffer.from(txOut.data, 'hex');
      } else if (txOut.script) {
        script = bscript.fromASM(txOut.script);
      }

      tx.addOutput(script!, txOut.value);
    });

    return tx;
  }

  describe('fromBuffer/fromHex', () => {
    function importExport(f: any): void {
      const id = f.id || f.hash;
      const txHex = f.hex || f.txHex;

      const key2: keyof NetworkConfig = f.network;

      it('imports ' + f.description + ' (' + id + ')', () => {
        const actual = Transaction.fromHex(txHex, networkConfig[key2]);

        assert.strictEqual(actual.toHex(), txHex);
      });

      if (f.whex) {
        it('imports ' + f.description + ' (' + id + ') as witness', () => {
          const actual = Transaction.fromHex(f.whex, networkConfig[key2]);

          assert.strictEqual(actual.toHex(), f.whex);
        });
      }
    }

    fixtures.valid.forEach(importExport);
    fixtures.hashForSignature.forEach(importExport);
    fixtures.hashForWitnessV0.forEach(importExport);

    fixtures.invalid.fromBuffer.forEach(f => {
      const key3: keyof NetworkConfig = f.network;

      it('throws on ' + f.exception, () => {
        assert.throws(() => {
          Transaction.fromHex(f.hex, networkConfig[key3]);
        }, new RegExp(f.exception));
      });
    });

    const key: keyof NetworkConfig = 'bitcoin';

    it('.version should be interpreted as an int32le', () => {
      const txHex = 'ffffffff0000ffffffff';
      const tx = Transaction.fromHex(txHex, networkConfig[key]);
      assert.strictEqual(-1, tx.version);
      assert.strictEqual(0xffffffff, tx.locktime);
    });
  });

  describe('toBuffer/toHex', () => {
    fixtures.valid.forEach(f => {
      it('exports ' + f.description + ' (' + f.id + ')', () => {
        const actual = fromRaw(f, true);
        assert.strictEqual(actual.toHex(), f.hex);
      });

      if (f.whex) {
        it('exports ' + f.description + ' (' + f.id + ') as witness', () => {
          const wactual = fromRaw(f);
          assert.strictEqual(wactual.toHex(), f.whex);
        });
      }
    });

    it('accepts target Buffer and offset parameters', () => {
      const f = fixtures.valid[0];
      const actual = fromRaw(f);
      const byteLength = actual.byteLength();

      const target = Buffer.alloc(byteLength * 2);
      const a = actual.toBuffer(target, 0);
      const b = actual.toBuffer(target, byteLength);

      assert.strictEqual(a.length, byteLength);
      assert.strictEqual(b.length, byteLength);
      assert.strictEqual(a.toString('hex'), f.hex);
      assert.strictEqual(b.toString('hex'), f.hex);
      assert.deepStrictEqual(a, b);
      assert.deepStrictEqual(a, target.slice(0, byteLength));
      assert.deepStrictEqual(b, target.slice(byteLength));
    });
  });

  describe('hasWitnesses', () => {
    fixtures.valid.forEach(f => {
      it(
        'detects if the transaction has witnesses: ' +
          (f.whex ? 'true' : 'false'),
        () => {
          const key: keyof NetworkConfig = f.network || 'bitcoin';
          assert.strictEqual(
            Transaction.fromHex(
              f.whex ? f.whex : f.hex,
              networkConfig[key],
            ).hasWitnesses(),
            !!f.whex,
          );
        },
      );
    });
  });

  describe('weight/virtualSize', () => {
    it('computes virtual size', () => {
      fixtures.valid.forEach(f => {
        const key: keyof NetworkConfig = f.network || 'bitcoin';
        const transaction = Transaction.fromHex(
          f.whex ? f.whex : f.hex,
          networkConfig[key],
        );

        assert.strictEqual(transaction.virtualSize(), f.virtualSize);
      });
    });

    it('computes weight', () => {
      fixtures.valid.forEach(f => {
        const key: keyof NetworkConfig = f.network || 'bitcoin';
        const transaction = Transaction.fromHex(
          f.whex ? f.whex : f.hex,
          networkConfig[key],
        );

        assert.strictEqual(transaction.weight(), f.weight);
      });
    });
  });

  describe('addInput', () => {
    let prevTxHash: Buffer;
    beforeEach(() => {
      prevTxHash = Buffer.from(
        'ffffffff00ffff000000000000000000000000000000000000000000101010ff',
        'hex',
      );
    });

    const key: string = 'bitcoin';

    it('returns an index', () => {
      const tx = new Transaction(networkConfig[key]);
      assert.strictEqual(tx.addInput(prevTxHash, 0), 0);
      assert.strictEqual(tx.addInput(prevTxHash, 0), 1);
    });

    it('defaults to empty script, witness and 0xffffffff SEQUENCE number', () => {
      const tx = new Transaction(networkConfig[key]);
      tx.addInput(prevTxHash, 0);

      assert.strictEqual(tx.ins[0].script.length, 0);
      assert.strictEqual(tx.ins[0].witness.length, 0);
      assert.strictEqual(tx.ins[0].sequence, 0xffffffff);
    });

    fixtures.invalid.addInput.forEach(f => {
      it('throws on ' + f.exception, () => {
        const key3: keyof NetworkConfig = f.network || 'bitcoin';
        const tx = new Transaction(networkConfig[key3]);
        const hash = Buffer.from(f.hash, 'hex');

        assert.throws(() => {
          tx.addInput(hash, f.index);
        }, new RegExp(f.exception));
      });
    });
  });

  describe('addOutput', () => {
    it('returns an index', () => {
      const key: string = 'bitcoin';
      const tx = new Transaction(networkConfig[key]);
      assert.strictEqual(tx.addOutput(Buffer.alloc(0), 0), 0);
      assert.strictEqual(tx.addOutput(Buffer.alloc(0), 0), 1);
    });
  });

  describe('clone', () => {
    fixtures.valid.forEach(f => {
      let actual: Transaction;
      let expected: Transaction;

      const key3: keyof NetworkConfig = f.network || 'bitcoin';

      beforeEach(() => {
        expected = Transaction.fromHex(f.hex, networkConfig[key3]);
        actual = expected.clone();
      });

      it('should have value equality', () => {
        assert.deepStrictEqual(actual, expected);
      });

      it('should not have reference equality', () => {
        assert.notStrictEqual(actual, expected);
      });
    });
  });

  describe('getHash/getId', () => {
    function verify(f: any): void {
      const key3: keyof NetworkConfig = f.network || 'bitcoin';
      it('should return the id for ' + f.id + '(' + f.description + ')', () => {
        const tx = Transaction.fromHex(f.whex || f.hex, networkConfig[key3]);

        assert.strictEqual(tx.getHash().toString('hex'), f.hash);
        assert.strictEqual(tx.getId(), f.id);
      });
    }

    fixtures.valid.forEach(verify);
  });

  describe('isCoinbase', () => {
    function verify(f: any): void {
      it(
        'should return ' +
          f.coinbase +
          ' for ' +
          f.id +
          '(' +
          f.description +
          ')',
        () => {
          const key3: keyof NetworkConfig = f.network || 'bitcoin';

          const tx = Transaction.fromHex(f.hex, networkConfig[key3]);

          assert.strictEqual(tx.isCoinbase(), f.coinbase);
        },
      );
    }

    fixtures.valid.forEach(verify);
  });

  describe('hashForSignature', () => {
    it('does not use Witness serialization', () => {
      const randScript = Buffer.from('6a', 'hex');
      const key: string = 'bitcoin';
      const tx = new Transaction(networkConfig[key]);
      tx.addInput(
        Buffer.from(
          '0000000000000000000000000000000000000000000000000000000000000000',
          'hex',
        ),
        0,
      );
      tx.addOutput(randScript, 5000000000);

      const original = (tx as any).__toBuffer;
      (tx as any).__toBuffer = function(
        this: Transaction,
        a: any,
        b: any,
        c: any,
      ): any {
        if (c !== false) throw new Error('hashForSignature MUST pass false');

        return original.call(this, a, b, c);
      };

      assert.throws(() => {
        (tx as any).__toBuffer(undefined, undefined, true);
      }, /hashForSignature MUST pass false/);

      // assert hashForSignature does not pass false
      assert.doesNotThrow(() => {
        tx.hashForSignature(0, randScript, 1);
      });
    });

    fixtures.hashForSignature.forEach(f => {
      it(
        'should return ' +
          f.hash +
          ' for ' +
          (f.description ? 'case "' + f.description + '"' : f.script),
        () => {
          const key3: keyof NetworkConfig = f.network || 'bitcoin';
          const tx = Transaction.fromHex(f.txHex, networkConfig[key3]);
          const script = bscript.fromASM(f.script);

          assert.strictEqual(
            tx.hashForSignature(f.inIndex, script, f.type).toString('hex'),
            f.hash,
          );
        },
      );
    });
  });

  describe('hashForWitnessV0', () => {
    fixtures.hashForWitnessV0.forEach(f => {
      it(
        'should return ' +
          f.hash +
          ' for ' +
          (f.description ? 'case "' + f.description + '"' : ''),
        () => {
          const key3: keyof NetworkConfig = f.network || 'bitcoin';
          const tx = Transaction.fromHex(f.txHex, networkConfig[key3]);
          const script = bscript.fromASM(f.script);

          assert.strictEqual(
            tx
              .hashForWitnessV0(f.inIndex, script, f.value, f.type)
              .toString('hex'),
            f.hash,
          );
        },
      );
    });
  });

  describe('setWitness', () => {
    it('only accepts a a witness stack (Array of Buffers)', () => {
      assert.throws(() => {
        const key: string = 'bitcoin';
        (new Transaction(networkConfig[key]).setWitness as any)(0, 'foobar');
      }, /Expected property "1" of type \[Buffer], got String "foobar"/);
    });
  });
});
