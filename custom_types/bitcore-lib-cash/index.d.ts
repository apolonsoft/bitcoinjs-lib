declare module 'bitcore-lib-cash' {
  export namespace Networks {
    export class Network {
      /**
       * A network is merely a map containing values that correspond to version
       * numbers for each bitcoin network. Currently only supporting "livenet"
       * (a.k.a. "mainnet") and "testnet".
       * @constructor
       */
      constructor();

      toString(): string;
    }

    /**
     * @function
     * @member Networks#add
     * Will add a custom Network
     * @param {Object} data
     * @param {string} data.name - The name of the network
     * @param {string} data.alias - The aliased name of the network
     * @param {Number} data.pubkeyhash - The publickey hash prefix
     * @param {Number} data.privatekey - The privatekey prefix
     * @param {Number} data.scripthash - The scripthash prefix
     * @param {Number} data.xpubkey - The extended public key magic
     * @param {Number} data.xprivkey - The extended private key magic
     * @param {Number} data.networkMagic - The network magic number
     * @param {Number} data.port - The network port
     * @param {Array}  data.dnsSeeds - An array of dns seeds
     * @return Network
     */
    export function add(data: {
      name: string;
      alias: string;
      pubkeyhash: number;
      privatekey: number;
      scripthash: number;
      xpubkey: number;
      xprivkey: number;
      networkMagic: number;
      port: number;
      dnsSeeds: any[];
    }): Network;

    /**
     * @function
     * @member Networks#remove
     * Will remove a custom network
     * @param {Network} network
     */
    export function remove(network: Network): void;

    /**
     * @function
     * @member Networks#get
     * Retrieves the network associated with a magic number or string.
     * @param {string|number|Network} arg
     * @param {string|Array} keys - if set, only check if the magic number associated with this name matches
     * @return Network
     */
    export function get(
      arg: string | number | Network,
      keys: string | any[],
    ): Network;

    /**
     * @function
     * @deprecated
     * @member Networks#enableRegtest
     * Will enable regtest features for testnet
     */
    export function enableRegtest(): void;

    /**
     * @function
     * @deprecated
     * @member Networks#disableRegtest
     * Will disable regtest features for testnet
     */
    export function disableRegtest(): void;

    export const defaultNetwork: Network;
    export const livenet: Network;
    export const mainnet: Network;
    export const testnet: Network;
    export const regtest: Network;
  }

  export namespace crypto {
    export class BN {
      static Zero: BN;
      static One: BN;
      static Minus1: BN;

      static fromNumber(n: number): BN;

      static fromString(str: string, base: number): BN;

      static fromBuffer(buf: Buffer, opts?: { endian: string }): BN;

      /**
       * Instantiate a BigNumber from a "signed magnitude buffer"
       * (a buffer where the most significant bit represents the sign (0 = positive, -1 = negative))
       */
      static fromSM(buf: Buffer, otps?: { endian: string }): BN;

      /**
       * Create a BN from a "ScriptNum":
       * This is analogous to the constructor for CScriptNum in bitcoind. Many ops in
       * bitcoind's script interpreter use CScriptNum, which is not really a proper
       * bignum. Instead, an error is thrown if trying to input a number bigger than
       * 4 bytes. We copy that behavior here. A third argument, `size`, is provided to
       * extend the hard limit of 4 bytes, as some usages require more than 4 bytes.
       */
      static fromScriptNumBuffer(
        buf: Buffer,
        fRequireMinimal?: boolean,
        size?: number,
      ): BN;

      static trim(buf: Buffer, natlen: number): Buffer;

      static pad(buf: Buffer, natlen: number, size: number): Buffer;

      toNumber(): number;

      toBuffer(otps?: { size?: number; endian?: string }): Buffer;

      toSMBigEndian(): Buffer;

      toSM(opts?: { endian: string }): Buffer;

      /**
       * The corollary to the above, with the notable exception that we do not throw
       * an error if the output is larger than four bytes. (Which can happen if
       * performing a numerical operation that results in an overflow to more than 4
       * bytes).
       */
      toScriptNumBuffer(): Buffer;
    }
    export class Point {
      /**
       *
       * Instantiate a valid secp256k1 Point from only the X coordinate
       *
       * @param {boolean} odd - If the Y coordinate is odd
       * @param {BN|String} x - The X coordinate
       * @throws {Error} A validation error if exists
       * @returns {Point} An instance of Point
       */
      static fromX(odd: boolean, x: BN | string): Point;

      /**
       *
       * Will return a secp256k1 ECDSA base point.
       *
       * @link https://en.bitcoin.it/wiki/Secp256k1
       * @returns {Point} An instance of the base point.
       */
      static getG(): Point;

      /**
       *
       * Will return the max of range of valid private keys as governed by the secp256k1 ECDSA standard.
       *
       * @link https://en.bitcoin.it/wiki/Private_key#Range_of_valid_ECDSA_private_keys
       * @returns {BN} A BN instance of the number of points on the curve
       */
      static getN(): BN;

      static pointToCompressed(point: Point): Buffer;

      /**
       *
       * Instantiate a valid secp256k1 Point from the X and Y coordinates.
       *
       * @param {BN|String} x - The X coordinate
       * @param {BN|String} y - The Y coordinate
       * @param isRed No description
       * @link https://github.com/indutny/elliptic
       * @augments elliptic.curve.point
       * @throws {Error} A validation error if exists
       * @returns {Point} An instance of Point
       * @constructor
       */
      constructor(x: BN | string, y: BN | string, isRed?: boolean);

      /**
       *
       * Will return the X coordinate of the Point
       *
       * @returns {BN} A BN instance of the X coordinate
       */
      getX(): BN;

      /**
       *
       * Will return the Y coordinate of the Point
       *
       * @returns {BN} A BN instance of the Y coordinate
       */
      getY(): BN;
      /**
       *
       * Will determine if the point is valid
       *
       * @link https://www.iacr.org/archive/pkc2003/25670211/25670211.pdf
       * @throws {Error} A validation error if exists
       * @returns {Point} An instance of the same Point
       */
      validate(): Point;

      hasSquare(): boolean;

      isSquare(x: string | BN): boolean;
    }

    export class Signature {
      static SIGHASH_ALL: number;
      static SIGHASH_NONE: number;
      static SIGHASH_SINGLE: number;
      static SIGHASH_FORKID: number;
      static SIGHASH_ANYONECANPAY: number;

      static fromCompact(buf: Buffer): Signature;

      static fromDER(buf: Buffer, strict: boolean): Signature;

      static fromBuffer(buf: Buffer, strict: boolean): Signature;

      static fromTxFormat(buf: Buffer): Signature;

      static fromDataFormat(buf: Buffer): Signature;

      static fromString(str: string): Signature;

      static parseSchnorrEncodedSig(buf: Buffer): object;

      static isTxDER(buf: Buffer): boolean;

      /**
       * This function is translated from bitcoind's IsDERSignature and is used in
       * the script interpreter.  This "DER" format actually includes an extra byte,
       * the nhashtype, at the end. It is really the tx format, not DER format.
       *
       * A canonical signature exists of: [30] [total len] [02] [len R] [R] [02] [len S] [S]
       * Where R and S are not negative (their first byte has its highest bit not set), and not
       * excessively padded (do not start with a 0 byte, unless an otherwise negative number follows,
       * in which case a single 0 byte is necessary and even required).
       *
       * See https://bitcointalk.org/index.php?topic=8392.msg127623#msg127623
       */
      static isDER(buf: Buffer): boolean;

      static parseDER(
        buf: Buffer,
        strict: boolean,
      ): {
        header: number;
        length: number;
        rheader: number;
        rlength: number;
        rneg: boolean;
        rbuf: Buffer;
        r: BN;
        sheader: number;
        slength: number;
        sneg: boolean;
        sbuf: Buffer;
        s: BN;
      };

      constructor(r: BN, s: any, isSchnorr: boolean);

      set(obj: object): this;

      toCompact(i: number, compressed: boolean): Buffer;

      toBuffer(signingMethod: string): Buffer;

      toDER(signingMethod: string): Buffer;

      toString(): string;

      /**
       * Compares to bitcoind's IsLowDERSignature
       * See also ECDSA signature algorithm which enforces this.
       * See also BIP 62, "low S values in signatures"
       */
      hasLowS(): boolean;

      /**
       * @returns true if the nhashtype is exactly equal to one of the standard options or combinations thereof.
       * Translated from bitcoind's IsDefinedHashtypeSignature
       */
      hasDefinedHashtype(): boolean;

      toTxFormat(signingMethod: string): Buffer;
    }
  }

  export class PrivateKey {
    /**
     * Instantiate a PrivateKey from a Buffer with the DER or WIF representation
     *
     * @param {Buffer} arg
     * @param {Network} network
     * @return {PrivateKey}
     */
    static fromBuffer(arg: Buffer, network: Networks.Network): PrivateKey;

    /**
     * Instantiate a PrivateKey from a WIF string
     *
     * @param {string} str - The WIF encoded private key string
     * @returns {PrivateKey} A new valid instance of PrivateKey
     */
    static fromString(str: string): PrivateKey;

    /**
     * Instantiate a PrivateKey from a WIF string
     *
     * @param {string} str - The WIF encoded private key string
     * @returns {PrivateKey} A new valid instance of PrivateKey
     */
    static fromWIF(str: string): PrivateKey;

    /**
     * Instantiate a PrivateKey from a plain JavaScript object
     *
     * @param {Object} obj - The output from privateKey.toObject()
     */
    static fromObject(obj: object): PrivateKey;

    /**
     * Instantiate a PrivateKey from random bytes
     *
     * @param {string=} network - Either "livenet" or "testnet"
     * @returns {PrivateKey} A new valid instance of PrivateKey
     */
    static fromRandom(network?: string): PrivateKey;

    /**
     * Check if there would be any errors when initializing a PrivateKey
     *
     * @param {string} data - The encoded data in various formats
     * @param {string=} network - Either "livenet" or "testnet"
     * @returns {null|Error} An error if exists
     */
    static getValidationError(data: string, network?: string): null | Error;

    /**
     * Check if the parameters are valid
     *
     * @param {string} data - The encoded data in various formats
     * @param {string=} network - Either "livenet" or "testnet"
     * @returns {Boolean} If the private key is would be valid
     */
    static isValid(data: string, network?: string): boolean;
    /**
     * Instantiate a PrivateKey from a BN, Buffer and WIF.
     *
     * @example
     * ```javascript
     * // generate a new random key
     * var key = PrivateKey();
     *
     * // get the associated address
     * var address = key.toAddress();
     *
     * // encode into wallet export format
     * var exported = key.toWIF();
     *
     * // instantiate from the exported (and saved) private key
     * var imported = PrivateKey.fromWIF(exported);
     * ```
     *
     * @param {string} data - The encoded data in various formats
     * @param {Network|string=} network - a {@link Network} object, or a string with the network name
     * @returns {PrivateKey} A new valid instance of an PrivateKey
     * @constructor
     */
    constructor(data: string, network?: Networks.Network | string);

    /**
     * Will output the PrivateKey encoded as hex string
     *
     * @returns {string}
     */
    toString(): string;

    /**
     * Will output the PrivateKey to a WIF string
     *
     * @returns {string} A WIP representation of the private key
     */
    toWIF(): string;

    /**
     * Will return the private key as a BN instance
     *
     * @returns {BN} A BN instance of the private key
     */
    toBigNumber(): crypto.BN;

    /**
     * Will return the private key as a BN buffer
     *
     * @returns {Buffer} A buffer of the private key
     */
    toBuffer(): Buffer;

    /**
     * WARNING: This method will not be officially supported until v1.0.0.
     *
     *
     * Will return the private key as a BN buffer without leading zero padding
     *
     * @returns {Buffer} A buffer of the private key
     */
    toBufferNoPadding(): Buffer;

    /**
     * Will return the corresponding public key
     *
     * @returns {PublicKey} A public key generated from the private key
     */
    toPublicKey(): PublicKey;

    /**
     * Will return an address for the private key
     * @param {Network=} network - optional parameter specifying
     * the desired network for the address
     *
     * @returns {Address} An address generated from the private key
     */
    toAddress(network?: Networks.Network): Address;

    /**
     * @returns {Object} A plain object representation
     */
    toObject(): object;

    /**
     * @returns {Object} A plain object representation
     */
    toJSON(): object;

    /**
     * Will return a string formatted for the console
     *
     * @returns {string} Private key
     */
    inspect(): string;
  }

  export class PublicKey {
    /**
     * Instantiate a PublicKey from a PrivateKey
     *
     * @param {PrivateKey} privkey - An instance of PrivateKey
     * @returns {PublicKey} A new valid instance of PublicKey
     */
    static fromPrivateKey(privkey: PrivateKey): PublicKey;

    /**
     * Instantiate a PublicKey from a Buffer
     * @param {Buffer} buf - A DER hex buffer
     * @param {boolean=} strict - if set to false, will loosen some conditions
     * @returns {PublicKey} A new valid instance of PublicKey
     */
    static fromDER(buf: Buffer, strict?: boolean): PublicKey;

    /**
     * Instantiate a PublicKey from a Buffer
     * @param {Buffer} buf - A DER hex buffer
     * @param {boolean=} strict - if set to false, will loosen some conditions
     * @returns {PublicKey} A new valid instance of PublicKey
     */
    static fromBuffer(buf: Buffer, strict?: boolean): PublicKey;

    /**
     * Instantiate a PublicKey from a Point
     *
     * @param {Point} point - A Point instance
     * @param {boolean=} compressed - whether to store this public key as compressed format
     * @returns {PublicKey} A new valid instance of PublicKey
     */
    static fromPoint(point: crypto.Point, compressed?: boolean): PublicKey;

    /**
     * Instantiate a PublicKey from a DER hex encoded string
     *
     * @param {string} str - A DER hex string
     * @param {String=} encoding - The type of string encoding
     * @returns {PublicKey} A new valid instance of PublicKey
     */
    static fromString(str: string, encoding?: string): PublicKey;

    /**
     * Instantiate a PublicKey from an X Point
     *
     * @param {Boolean} odd - If the point is above or below the x axis
     * @param {Point} x - The x point
     * @returns {PublicKey} A new valid instance of PublicKey
     */
    static fromX(odd: boolean, x: crypto.Point): PublicKey;

    /**
     * Check if there would be any errors when initializing a PublicKey
     *
     * @param {string} data - The encoded data in various formats
     * @returns {null|Error} An error if exists
     */
    static getValidationError(data: string): PublicKey;

    /**
     * Check if the parameters are valid
     *
     * @param {string} data - The encoded data in various formats
     * @returns {Boolean} If the public key would be valid
     */
    static isValid(data: string): PublicKey;
    /**
     * Instantiate a PublicKey from a {@link PrivateKey}, {@link Point}, `string`, or `Buffer`.
     *
     * There are two internal properties, `network` and `compressed`, that deal with importing
     * a PublicKey from a PrivateKey in WIF format. More details described on {@link PrivateKey}
     *
     * @example
     * ```javascript
     * // instantiate from a private key
     * var key = PublicKey(privateKey, true);
     *
     * // export to as a DER hex encoded string
     * var exported = key.toString();
     *
     * // import the public key
     * var imported = PublicKey.fromString(exported);
     * ```
     *
     * @param {string} data - The encoded data in various formats
     * @param {Object} extra - additional options
     * @param {Network=} extra.network - Which network should the address for this public key be for
     * @param {String=} extra.compressed - If the public key is compressed
     * @returns {PublicKey} A new valid instance of an PublicKey
     * @constructor
     */
    constructor(
      data: string,
      extra?: { network?: Networks.Network; compressed?: string },
    );

    /**
     * @returns {Object} A plain object of the PublicKey
     */
    toObject(): object;

    /**
     * Will output the PublicKey to a DER Buffer
     *
     * @returns {Buffer} A DER hex encoded buffer
     */
    toBuffer(): Buffer;

    /**
     * Will return an address for the public key
     *
     * @param {String|Network=} network - Which network should the address be for
     * @returns {Address} An address generated from the public key
     */
    toAddress(network?: string | Networks.Network): Address;

    /**
     * Will output the PublicKey to a DER encoded hex string
     *
     * @returns {string} A DER hex encoded string
     */
    toString(): string;

    /**
     * Will return a string formatted for the console
     *
     * @returns {string} Public key
     */
    inspect(): string;
  }

  export class Script {
    static types: {
      UNKNOWN: string;
      PUBKEY_OUT: string;
      PUBKEY_IN: string;
      PUBKEYHASH_OUT: string;
      PUBKEYHASH_IN: string;
      SCRIPTHASH_OUT: string;
      SCRIPTHASH_IN: string;
      MULTISIG_OUT: string;
      MULTISIG_IN: string;
      DATA_OUT: string;
    };

    static outputIdentifiers: {
      PUBKEY_OUT: () => boolean;
      PUBKEYHASH_OUT: () => boolean;
      MULTISIG_OUT: () => boolean;
      SCRIPTHASH_OUT: () => boolean;
      DATA_OUT: () => boolean;
    };

    static fromBuffer(buffer: Buffer): Script;

    static fromASM(str: string): Script;

    static fromHex(str: string): Script;

    static fromString(str: string): Script;

    /**
     * @returns {Script} a new Multisig output script for given public keys,
     * requiring m of those public keys to spend
     * @param {PublicKey[]} publicKeys - list of all public keys controlling the output
     * @param {number} threshold - amount of required signatures to spend the output
     * @param {Object=} opts - Several options:
     *        - noSorting: defaults to false, if true, don't sort the given
     *                      public keys before creating the script
     */
    static buildMultisigOut(
      publicKeys: PublicKey[],
      threshold: number,
      opts?: object,
    ): Script;

    /**
     * A new Multisig input script for the given public keys, requiring m of those public keys to spend
     *
     * @param {PublicKey[]} pubkeys list of all public keys controlling the output
     * @param {number} threshold amount of required signatures to spend the output
     * @param {Array} signatures and array of signature buffers to append to the script
     * @param {Object=} opts
     * @param {boolean=} opts.noSorting don't sort the given public keys before creating the script (false by default)
     * @param {Script=} opts.cachedMultisig don't recalculate the redeemScript
     *
     * @returns {Script}
     */
    static buildMultisigIn(
      pubkeys: PublicKey[],
      threshold: number,
      signatures: Buffer[],
      opts?: { noSorting?: boolean; cachedMultisig?: Script },
    ): Script;

    /**
     * A new P2SH Multisig input script for the given public keys, requiring m of those public keys to spend
     *
     * @param {PublicKey[]} pubkeys list of all public keys controlling the output
     * @param {number} threshold amount of required signatures to spend the output
     * @param {Array} signatures and array of signature buffers to append to the script
     * @param {Object=} opts
     * @param {boolean=} opts.noSorting don't sort the given public keys before creating the script (false by default)
     * @param {Script=} opts.cachedMultisig don't recalculate the redeemScript
     * @param {Uint8Array} opts.checkBits bitfield map 1 or 0 to check which signatures
     *  to map against public keys for verification in schnorr multisig mode
     * @param {String} opts.signingMethod method with which input will be signed "ecdsa" or "schnorr"
     *
     * @returns {Script}
     */
    static buildP2SHMultisigIn(
      pubkeys: PublicKey[],
      threshold: number,
      signatures: Buffer[],
      opts?: {
        noSorting?: boolean;
        cachedMultisig?: Script;
        checkBits: Uint8Array;
        signingMethod: string;
      },
    ): Script;

    /**
     * @returns {Script} a new pay to public key hash output for the given
     * address or public key
     * @param {(Address|PublicKey)} to - destination address or public key
     */
    static buildPublicKeyHashOut(to: Address | PublicKey): Script;

    /**
     * @returns {Script} a new pay to public key output for the given
     *  public key
     */
    static buildPublicKeyOut(pubkey: PublicKey): Script;

    /**
     * @returns {Script} a new OP_RETURN script with data
     * @param {(string|Buffer)} data - the data to embed in the output
     * @param {(string)} encoding - the type of encoding of the string
     */
    static buildDataOut(data: string | Buffer, encoding: string): Script;

    /**
     * @param {Script|Address} script - the redeemScript for the new p2sh output.
     *    It can also be a p2sh address
     * @returns {Script} new pay to script hash script for given script
     */
    static buildScriptHashOut(script: Script | Address): Script;

    /**
     * Builds a scriptSig (a script for an input) that signs a public key output script.
     *
     * @param {Signature|Buffer} signature - a Signature object, or the signature in DER canonical encoding
     * @param {number=} sigtype - the type of the signature (defaults to SIGHASH_ALL)
     */
    static buildPublicKeyIn(
      signature: crypto.Signature | Buffer,
      sigtype?: number,
    ): Script;

    /**
     * Builds a scriptSig (a script for an input) that signs a public key hash
     * output script.
     *
     * @param {Buffer|string|PublicKey} publicKey
     * @param {Signature|Buffer} signature - a Signature object, or the signature in DER canonical encoding
     * @param {number=} sigtype - the type of the signature (defaults to SIGHASH_ALL)
     */
    static buildPublicKeyHashIn(
      publicKey: Buffer | string | PublicKey,
      signature: crypto.Signature | Buffer,
      sigtype?: number,
    ): Script;

    /**
     * @returns {Script} an empty script
     */
    static empty(): Script;

    /**
     * @return {Script} an output script built from the address
     */
    static fromAddress(address: Address | string): Script;

    /**
     * A bitcoin transaction script. Each transaction's inputs and outputs
     * has a script that is evaluated to validate it's spending.
     *
     * See https://en.bitcoin.it/wiki/Script
     *
     * @constructor
     * @param {Object|string|Buffer=} from optional data to populate script
     */
    constructor(from?: object | string | Buffer);

    set(obj: { chunks: any[] }): this;

    toBuffer(): Buffer;

    toASM(): string;

    toString(): string;

    toHex(): string;

    inspect(): string;

    /**
     * @returns {boolean} if this is a pay to pubkey hash output script
     */
    isPublicKeyHashOut(): boolean;

    /**
     * @returns {boolean} if this is a pay to public key hash input script
     */
    isPublicKeyHashIn(): boolean;

    getPublicKey(): Buffer;

    getPublicKeyHash(): Buffer;

    /**
     * @returns {boolean} if this is a public key output script
     */
    isPublicKeyOut(): boolean;

    /**
     * @returns {boolean} if this is a pay to public key input script
     */
    isPublicKeyIn(): boolean;

    /**
     * @returns {boolean} if this is a p2sh output script
     */
    isScriptHashOut(): boolean;

    /**
     * @returns {boolean} if this is a p2sh input script
     * Note that these are frequently indistinguishable from pubkeyhashin
     */
    isScriptHashIn(): boolean;

    /**
     * @returns {boolean} if this is a mutlsig output script
     */
    isMultisigOut(): boolean;

    /**
     * @returns {boolean} if this is a multisig input script
     */
    isMultisigIn(): boolean;

    /**
     * @returns {boolean} true if this is a valid standard OP_RETURN output
     */
    isDataOut(): boolean;

    /**
     * Retrieve the associated data for this script.
     * In the case of a pay to public key hash or P2SH, return the hash.
     * In the case of a standard OP_RETURN, return the data
     * @returns {Buffer}
     */
    getData(): Buffer;

    /**
     * @returns {boolean} if the script is only composed of data pushing
     * opcodes or small int opcodes (OP_0, OP_1, ..., OP_16)
     */
    isPushOnly(): boolean;

    /**
     * @returns {object} The Script type if it is a known form,
     * or Script.UNKNOWN if it isn't
     */
    classify(): object;

    /**
     * @returns {object} The Script type if it is a known form,
     * or Script.UNKNOWN if it isn't
     */
    classifyOutput(): object;

    /**
     * @returns {object} The Script type if it is a known form,
     * or Script.UNKNOWN if it isn't
     */
    classifyInput(): object;

    /**
     * @returns {boolean} if script is one of the known types
     */
    isStandard(): boolean;

    /**
     * Adds a script element at the start of the script.
     * @param {*} obj a string, number, Opcode, Buffer, or object to add
     * @returns {Script} this script instance
     */
    prepend(obj: any): this;

    /**
     * Compares a script with another script
     */
    equals(script: Script): boolean;

    /**
     * Adds a script element to the end of the script.
     *
     * @param {*} obj a string, number, Opcode, Buffer, or object to add
     * @returns {Script} this script instance
     *
     */
    add(obj: any): this;

    removeCodeseparators(): this;

    /**
     * @returns {Script} a new pay to script hash script that pays to this script
     */
    toScriptHashOut(): Script;

    /**
     * Will return the associated address information object
     * @return {Address|boolean}
     */
    getAddressInfo(opts?: object): Address | boolean;

    /**
     * @param {Network=} network
     * @return {Address|boolean} the associated address for this script if possible, or false
     */
    toAddress(network?: Networks.Network): Address | boolean;

    /**
     * Analogous to bitcoind's FindAndDelete. Find and delete equivalent chunks,
     * typically used with push data chunks.  Note that this will find and delete
     * not just the same data, but the same data with the same push data op as
     * produced by default. i.e., if a pushdata in a tx does not use the minimal
     * pushdata op, then when you try to remove the data it is pushing, it will not
     * be removed, because they do not use the same pushdata op.
     */
    findAndDelete(script: Script): this;

    /**
     * Comes from bitcoind's script interpreter CheckMinimalPush function
     * @returns {boolean} if the chunk {i} is the smallest way to push that particular data.
     */
    checkMinimalPush(i: number): boolean;

    /**
     * Comes from bitcoind's script GetSigOpCount(boolean) function
     * @param {boolean} use current (true) or pre-version-0.6 (false) logic
     * @returns {number} number of signature operations required by this script
     */
    getSignatureOperationsCount(use: boolean): number;
  }

  export class Address {
    /**
     * Creates a P2SH address from a set of public keys and a threshold.
     *
     * The addresses will be sorted lexicographically, as that is the trend in bitcoin.
     * To create an address from unsorted public keys, use the {@link Script#buildMultisigOut}
     * interface.
     *
     * @param {Array} publicKeys - a set of public keys to create an address
     * @param {number} threshold - the number of signatures needed to release the funds
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @return {Address}
     */
    static createMultisig(
      publicKeys: PublicKey[],
      threshold: number,
      network: string | Networks.Network,
    ): Address;

    /**
     * Instantiate an address from a PublicKey instance
     *
     * @param {PublicKey} data
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @returns {Address} A new valid and frozen instance of an Address
     */
    static fromPublicKey(
      data: PublicKey,
      network: string | Networks.Network,
    ): Address;

    /**
     * Instantiate an address from a ripemd160 public key hash
     *
     * @param {Buffer} hash - An instance of buffer of the hash
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @returns {Address} A new valid and frozen instance of an Address
     */
    static fromPublicKeyHash(
      hash: Buffer,
      network: string | Networks.Network,
    ): Address;

    /**
     * Instantiate an address from a ripemd160 script hash
     *
     * @param {Buffer} hash - An instance of buffer of the hash
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @returns {Address} A new valid and frozen instance of an Address
     */
    static fromScriptHash(
      hash: Buffer,
      network: string | Networks.Network,
    ): Address;

    /**
     * Builds a p2sh address paying to script. This will hash the script and
     * use that to create the address.
     * If you want to extract an address associated with a script instead,
     * see {{Address#fromScript}}
     *
     * @param {Script} script - An instance of Script
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @returns {Address} A new valid and frozen instance of an Address
     */
    static payingTo(
      script: Script,
      network: string | Networks.Network,
    ): Address;

    /**
     * Extract address from a Script. The script must be of one
     * of the following types: p2pkh input, p2pkh output, p2sh input
     * or p2sh output.
     * This will analyze the script and extract address information from it.
     * If you want to transform any script to a p2sh Address paying
     * to that script's hash instead, use {{Address#payingTo}}
     *
     * @param {Script} script - An instance of Script
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @returns {Address} A new valid and frozen instance of an Address
     */
    static fromScript(
      script: Script,
      network: string | Networks.Network,
    ): Address;

    /**
     * Instantiate an address from a buffer of the address
     *
     * @param {Buffer} buffer - An instance of buffer of the address
     * @param {String|Network=} network - either a Network instance, 'livenet', or 'testnet'
     * @param {string=} type - The type of address: 'script' or 'pubkey'
     * @returns {Address} A new valid and frozen instance of an Address
     */
    static fromBuffer(
      buffer: Buffer,
      network: string | Networks.Network,
      type?: string,
    ): Address;

    /**
     * Instantiate an address from an address string
     *
     * @param {string} str - An string of the bitcoin address
     * @param {String|Network=} network - either a Network instance, 'livenet', or 'testnet'
     * @param {string=} type - The type of address: 'script' or 'pubkey'
     * @returns {Address} A new valid and frozen instance of an Address
     */
    static fromString(
      str: string,
      network?: string | Networks.Network,
      type?: string,
    ): Address;

    /**
     * Instantiate an address from an Object
     *
     * @param {Object} obj - An Object with keys: hash, network and type // modified cause of wrong types at src
     * @returns {Address} A new valid instance of an Address
     */
    static fromObject(obj: object): Address;

    /**
     * Will return a validation error if exists
     *
     * @example
     * ```javascript
     * // a network mismatch error
     * var error = Address.getValidationError('15vkcKf7gB23wLAnZLmbVuMiiVDc1Nm4a2', 'testnet');
     * ```
     *
     * @param {string} data - The encoded data
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @param {string} type - The type of address: 'script' or 'pubkey'
     * @returns {null|Error} The corresponding error message
     */
    static getValidationError(
      data: string,
      network: string | Networks.Network,
      type: string,
    ): null | Error;

    /**
     * Will return a boolean if an address is valid
     *
     * @example
     * ```javascript
     * assert(Address.isValid('15vkcKf7gB23wLAnZLmbVuMiiVDc1Nm4a2', 'livenet'));
     * ```
     *
     * @param {string} data - The encoded data
     * @param {String|Network} network - either a Network instance, 'livenet', or 'testnet'
     * @param {string} type - The type of address: 'script' or 'pubkey'
     * @returns {boolean} The corresponding error message
     */
    static isValid(
      data: string,
      network: string | Networks.Network,
      type: string,
    ): boolean;

    /**
     * Instantiate an address from an address String or Buffer, a public key or script hash Buffer,
     * or an instance of {@link PublicKey} or {@link Script}.
     *
     * This is an immutable class, and if the first parameter provided to this constructor is an
     * `Address` instance, the same argument will be returned.
     *
     * An address has two key properties: `network` and `type`. The type is either
     * `Address.PayToPublicKeyHash` (value is the `'pubkeyhash'` string)
     * or `Address.PayToScriptHash` (the string `'scripthash'`). The network is an instance of {@link Network}.
     * You can quickly check whether an address is of a given kind by using the methods
     * `isPayToPublicKeyHash` and `isPayToScriptHash`
     *
     * @example
     * ```javascript
     * // validate that an input field is valid
     * var error = Address.getValidationError(input, 'testnet');
     * if (!error) {
     *   var address = Address(input, 'testnet');
     * } else {
     *   // invalid network or checksum (typo?)
     *   var message = error.messsage;
     * }
     *
     * // get an address from a public key
     * var address = Address(publicKey, 'testnet').toString();
     * ```
     *
     * @param {*} data - The encoded data in various formats
     * @param {Network|String|number=} network - The network: 'livenet' or 'testnet'
     * @param {string=} type - The type of address: 'script' or 'pubkey'
     * @returns {Address} A new valid and frozen instance of an Address
     * @constructor
     */
    constructor(
      data: any,
      network?: string | number | Networks.Network,
      type?: string,
    );

    /**
     * Returns true if an address is of pay to public key hash type
     * @return boolean
     */
    isPayToPublicKeyHash(): boolean;

    /**
     * Returns true if an address is of pay to script hash type
     * @return boolean
     */
    isPayToScriptHash(): boolean;

    /**
     * Will return a buffer representation of the address
     *
     * @returns {Buffer} Bitcoin address buffer
     */
    toBuffer(): Buffer;

    /**
     * @returns {Object} A plain object with the address information
     */
    toObject(): object;

    /**
     * @returns {Object} A plain object with the address information
     */
    toJSON(): object;

    /**
     * Will return a string formatted for the console
     *
     * @returns {string} Bitcoin address
     */
    inspect(): string;

    toCashBuffer(): Buffer;

    /**
     * Will return a the base58 (legacy) string representation of the address
     *
     * @returns {string} Bitcoin address
     */
    toLegacyAddress(): string;

    /**
     * Will return a cashaddr representation of the address. Always return lower case
     * Can be converted by the caller to uppercase is needed (still valid).
     *
     * @param {boolean} stripPrefix Should add network prefix or not
     * @returns {string} Bitcoin Cash address
     */
    toCashAddress(stripPrefix: boolean): string;

    /**
     * Will return a string representation of the address (defaults to CashAddr format)
     *
     * @param {boolean} stripPrefix Should add network prefix or not
     * @returns {string} address
     */
    toString(stripPrefix?: boolean): string;
  }

  export namespace encoding {
    export class BufferReader {
      constructor(buf: Buffer | string | { pos?: number; buf?: Buffer });

      set(obj: { pos?: number; buf?: Buffer }): this;

      eof(): boolean;

      finished(): boolean;

      read(len: number): Buffer;

      readAll(): Buffer;

      readUInt8(): number;

      readUInt16BE(): number;

      readUInt16LE(): number;

      readUInt32BE(): number;

      readUInt32LE(): number;

      readInt32LE(): number;

      readUInt64BEBN(): crypto.BN;

      readUInt64LEBN(): crypto.BN;

      readVarintNum(): number | crypto.BN;

      readVarLengthBuffer(): Buffer;

      readVarintBuf(): Buffer;

      readVarintBN(): crypto.BN;

      reverse(): this;

      readReverse(len: number): Buffer;
    }

    export class BufferWriter {
      static varintBufNum(n: number): Buffer;

      static varintBufBN(bn: number): Buffer;

      constructor(obj: { bufs?: Buffer[]; bufLen: number });

      set(obj: { bufs?: Buffer[]; bufLen: number }): this;

      toBuffer(): Buffer;

      concat(): Buffer;

      write(buf: Buffer): this;

      writeReverse(buf: Buffer): this;

      writeUInt8(n: number): this;

      writeUInt16BE(n: number): this;

      writeUInt16LE(n: number): this;

      writeUInt32BE(n: number): this;

      writeInt32LE(n: number): this;

      writeUInt32LE(n: number): this;

      writeUInt64BEBN(bn: crypto.BN): this;

      writeUInt64LEBN(bn: crypto.BN): this;

      writeVarintNum(n: number): this;

      writeVarintBN(bn: crypto.BN): this;
    }
  }

  export namespace Transaction {
    export interface IUnspentOutput {
      txid?: string; // the previous transaction id
      txId?: string; // alias for `txid`
      vout?: number; // the index in the transaction
      outputIndex?: number; // alias for `vout`
      scriptPubKey?: string | Script; // the script that must be resolved to release the funds
      script?: string | Script; // alias for `scriptPubKey`
      amount?: number; // amount of bitcoins associated
      satoshis?: number; // alias for `amount`, but expressed in satoshis (1 BTC = 1e8 satoshis)
      address?: string | Address; // the associated address to the script, if provided
    }

    export class UnspentOutput {
      static fromObject(data: IUnspentOutput | string): UnspentOutput;

      /**
       * Represents an unspent output information: its script, associated amount and address,
       * transaction id and output index.
       *
       * @constructor
       * @param {object} data
       * @param {string} data.txid the previous transaction id
       * @param {string=} data.txId alias for `txid`
       * @param {number} data.vout the index in the transaction
       * @param {number=} data.outputIndex alias for `vout`
       * @param {string|Script} data.scriptPubKey the script that must be resolved to release the funds
       * @param {string|Script=} data.script alias for `scriptPubKey`
       * @param {number} data.amount amount of bitcoins associated
       * @param {number=} data.satoshis alias for `amount`, but expressed in satoshis (1 BTC = 1e8 satoshis)
       * @param {string|Address=} data.address the associated address to the script, if provided
       */
      constructor(data: IUnspentOutput);

      /**
       * Provide an informative output when displaying this object in the console
       * @returns string
       */
      inspect(): string;

      /**
       * String representation: just "txid:index"
       * @returns string
       */
      toString(): string;

      toObject(): {
        address?: string;
        txid: string;
        vout: number;
        scriptPubKey: string;
        amount: number;
      };

      toJSON(): {
        address?: string;
        txid: string;
        vout: number;
        scriptPubKey: string;
        amount: number;
      };
    }

    export abstract class Input {
      static MAXINT: number;
      static DEFAULT_SEQNUMBER: number;
      static DEFAULT_LOCKTIME_SEQNUMBER: number;
      static DEFAULT_RBF_SEQNUMBER: number;
      static SEQUENCE_LOCKTIME_TYPE_FLAG: number;

      static fromObject(obj: {
        prevTxId: string | Buffer;
        output?: Output;
        txidbuf?: Buffer;
        txoutnum?: number;
        outputIndex: number;
        sequenceNumber: number;
        scriptBuffer?: Buffer;
        script?: Script;
      }): Input;

      static fromBufferReader(br: encoding.BufferReader): Input;

      prevTxId: Buffer;
      outputIndex: number;
      sequenceNumber: number;
      get script(): Script;

      protected constructor(params: object);

      toObject(): {
        prevTxId: string;
        outputIndex: number;
        sequenceNumber: number;
        script: string;
        scriptString?: string;
        output?: object;
      };

      toJSON(): {
        prevTxId: string;
        outputIndex: number;
        sequenceNumber: number;
        script: string;
        scriptString?: string;
        output?: object;
      };

      toBufferWriter(writer: encoding.BufferWriter): encoding.BufferWriter;

      setScript(script: Script | null | string | Buffer): this;

      /**
       * Retrieve signatures for the provided PrivateKey.
       *
       * @param {Transaction} transaction - the transaction to be signed
       * @param {PrivateKey} privateKey - the private key to use when signing
       * @param {number} inputIndex - the index of this input in the provided transaction
       * @param {number} sigType - defaults to Signature.SIGHASH_ALL
       * @param {Buffer} addressHash - if provided, don't calculate the hash of the
       *     public key associated with the private key provided
       * @param {String} signingMethod "schnorr" or "ecdsa", default to "ecdsa" if not provided
       * @abstract
       */
      abstract getSignatures(
        transaction: Transaction,
        privateKey: PrivateKey,
        inputIndex: number,
        sigType: number,
        addressHash: Buffer,
        signingMethod: string,
      ): unknown[];

      abstract isFullySigned(): boolean;

      isFinal(): boolean;

      abstract addSignature(): this;

      abstract clearSignatures(): this;

      isValidSignature(
        transaction: Transaction,
        signature: unknown,
        signingMethod: string,
      ): boolean;

      /**
       * @returns true if this is a coinbase input (represents no input)
       */
      isNull(): boolean;

      /**
       * Sets sequence number so that transaction is not valid until the desired seconds
       *  since the transaction is mined
       *
       * @param {Number} time in seconds
       * @return {Transaction} this
       */
      lockForSeconds(time: number): this;

      /**
       * Sets sequence number so that transaction is not valid until
       *  the desired block height differnece since the tx is mined
       *
       * @param {Number} height
       * @return {Transaction} this
       */
      lockUntilBlockHeight(height: number): this;

      getLockTime(): null | number;
    }

    // TODO fill this with extended input classes
    export namespace Input {}

    export class Output {
      static fromObject(data: {
        satoshis: number;
        script: Buffer | string | Script;
      }): Output;

      static fromBufferReader(br: encoding.BufferReader): Output;

      get script(): Script;

      get satoshis(): crypto.BN | number | string;
      set satoshis(num: crypto.BN | number | string);

      get satoshisBN(): crypto.BN;
      set satoshisBN(num: crypto.BN);

      constructor(args: { satoshis: number; script: Buffer | string | Script });

      invalidSatoshis(): string | boolean;

      toObject(): { satoshis: number; script: string };

      toJSON(): { satoshis: number; script: string };

      setScriptFromBuffer(buffer: Buffer): void;

      setScript(script: Script | string | Buffer): this;

      inspect(): string;

      toBufferWriter(writer: encoding.BufferWriter): encoding.BufferWriter;
    }

    export class Signature {}
  }

  export class Transaction {
    // Minimum amount for an output for it not to be considered a dust output
    static DUST_AMOUNT: number;

    // Margin of error to allow fees in the vecinity of the expected value but doesn't allow a big difference
    static FEE_SECURITY_MARGIN: number;

    // max amount of satoshis in circulation
    static MAX_MONEY: number;

    // nlocktime limit to be considered block height rather than a timestamp
    static NLOCKTIME_BLOCKHEIGHT_LIMIT: number;

    // Max value for an unsigned 32 bit value
    static NLOCKTIME_MAX_VALUE: number;

    // Value used for fee estimation (satoshis per kilobyte)
    static FEE_PER_KB: number;

    // Safe upper bound for change address script size in bytes
    static CHANGE_OUTPUT_MAX_SIZE: number;

    static MAXIMUM_EXTRA_SIZE: number;

    /**
     * Create a 'shallow' copy of the transaction, by serializing and deserializing
     * it dropping any additional information that inputs and outputs may have hold
     *
     * @param {Transaction} transaction
     * @return {Transaction}
     */
    static shallowCopy(transaction: Transaction): Transaction;

    get hash(): encoding.BufferReader;
    get id(): encoding.BufferReader;
    get inputAmount(): number;
    get outputAmount(): number;

    /**
     * Represents a transaction, a set of inputs and outputs to change ownership of tokens
     *
     * @param {*} serialized
     * @constructor
     */
    constructor(serialized?: any);

    /**
     * Retrieve a hexa string that can be used with bitcoind's CLI interface
     * (decoderawtransaction, sendrawtransaction)
     *
     * @param {Object|boolean=} unsafe if true, skip all tests. if it's an object,
     *   it's expected to contain a set of flags to skip certain tests:
     * * `disableAll`: disable all checks
     * * `disableLargeFees`: disable checking for fees that are too large
     * * `disableIsFullySigned`: disable checking if all inputs are fully signed
     * * `disableDustOutputs`: disable checking if there are no outputs that are dust amounts
     * * `disableMoreOutputThanInput`: disable checking if the transaction spends more bitcoins
     *    than the sum of the input amounts
     * @return {string}
     */
    serialize(
      unsafe?:
        | boolean
        | {
            disableAll: boolean;
            disableLargeFees: boolean;
            disableIsFullySigned: boolean;
            disableDustOutputs: boolean;
            disableMoreOutputThanInput: boolean;
          },
    ): string;

    uncheckedSerialize(): string;

    toString(): string;

    /**
     * Retrieve a hexa string that can be used with bitcoind's CLI interface
     * (decoderawtransaction, sendrawtransaction)
     *
     * @param {Object=} opts allows to skip certain tests. {@see Transaction#serialize}
     * @return {string}
     */
    checkedSerialize(opts?: object): string;

    invalidSatoshis(): boolean;

    /**
     * Retrieve a possible error that could appear when trying to serialize and
     * broadcast this transaction.
     *
     * @param {Object} opts allows to skip certain tests. {@see Transaction#serialize}
     * @return {bitcore.Error}
     */
    getSerializationError(opts?: object): Error;

    inspect(): string;

    toBuffer(): Buffer;

    toBufferWriter(writer: encoding.BufferWriter): encoding.BufferWriter;

    fromBuffer(buffer: Buffer): this;

    fromBufferReader(reader: encoding.BufferReader): this;

    toObject(): {
      hash: encoding.BufferReader;
      version: number;
      inputs: Transaction.Input[];
      outputs: Transaction.Output[];
      nLockTime: number;
      changeScript?: string;
      changeIndex?: number;
      fee?: number;
    };

    toJSON(): {
      hash: encoding.BufferReader;
      version: number;
      inputs: Transaction.Input[];
      outputs: Transaction.Output[];
      nLockTime: number;
      changeScript?: string;
      changeIndex?: number;
      fee?: number;
    };

    fromObject(arg: object | Transaction): this;

    /**
     * Sets nLockTime so that transaction is not valid until the desired date(a
     * timestamp in seconds since UNIX epoch is also accepted)
     *
     * @param {Date | Number} time
     * @return {Transaction} this
     */
    lockUntilDate(time: Date | number): this;

    /**
     * Sets nLockTime so that transaction is not valid until the desired block
     * height.
     *
     * @param {Number} height
     * @return {Transaction} this
     */
    lockUntilBlockHeight(height: number): this;

    /**
     *  Returns a semantic version of the transaction's nLockTime.
     *  @return {Number|Date}
     *  If nLockTime is 0, it returns null,
     *  if it is < 500000000, it returns a block height (number)
     *  else it returns a Date object.
     */
    getLockTime(): number | Date;

    fromString(str: string): void;

    /**
     * @typedef {Object} Transaction~fromObject
     * @property {string} prevTxId
     * @property {number} outputIndex
     * @property {(Buffer|string|Script)} script
     * @property {number} satoshis
     */

    /**
     * Add an input to this transaction. This is a high level interface
     * to add an input, for more control, use @{link Transaction#addInput}.
     *
     * Can receive, as output information, the output of bitcoind's `listunspent` command,
     * and a slightly fancier format recognized by bitcore:
     *
     * ```
     * {
     *  address: 'mszYqVnqKoQx4jcTdJXxwKAissE3Jbrrc1',
     *  txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
     *  outputIndex: 0,
     *  script: Script.empty(),
     *  satoshis: 1020000
     * }
     * ```
     * Where `address` can be either a string or a bitcore Address object. The
     * same is true for `script`, which can be a string or a bitcore Script.
     *
     * Beware that this resets all the signatures for inputs (in further versions,
     * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
     *
     * @example
     * ```javascript
     * var transaction = new Transaction();
     *
     * // From a pay to public key hash output from bitcoind's listunspent
     * transaction.from({'txid': '0000...', vout: 0, amount: 0.1, scriptPubKey: 'OP_DUP ...'});
     *
     * // From a pay to public key hash output
     * transaction.from({'txId': '0000...', outputIndex: 0, satoshis: 1000, script: 'OP_DUP ...'});
     *
     * // From a multisig P2SH output
     * transaction.from({'txId': '0000...', inputIndex: 0, satoshis: 1000, script: '... OP_HASH'},
     *                  ['03000...', '02000...'], 2);
     * ```
     *
     * @param {(Array.<Transaction~fromObject>|Transaction~fromObject)} utxo
     * @param {Array=} pubkeys
     * @param {number=} threshold
     * @param {Object=} opts - Several options:
     *        - noSorting: defaults to false, if true and is multisig, don't
     *                      sort the given public keys before creating the script
     */
    from(
      utxo: Transaction.UnspentOutput[] | Transaction.UnspentOutput,
      pubkeys?: PublicKey[],
      threshold?: number,
      opts?: { noSorting?: boolean },
    ): this;

    /**
     * Add an input to this transaction. The input must be an instance of the `Input` class.
     * It should have information about the Output that it's spending, but if it's not already
     * set, two additional parameters, `outputScript` and `satoshis` can be provided.
     *
     * @param {Input} input
     * @param {String|Script} outputScript
     * @param {number} satoshis
     * @return Transaction this, for chaining
     */
    addInput(
      input: Transaction.Input,
      outputScript: string | Script,
      satoshis: number,
    ): this;

    /**
     * Add an input to this transaction, without checking that the input has information about
     * the output that it's spending.
     *
     * @param {Input} input
     * @return Transaction this, for chaining
     */
    uncheckedAddInput(input: Transaction.Input): this;

    /**
     * Returns true if the transaction has enough info on all inputs to be correctly validated
     *
     * @return {boolean}
     */
    hasAllUtxoInfo(): boolean;

    /**
     * Manually set the fee for this transaction. Beware that this resets all the signatures
     * for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
     * be reset).
     *
     * @param {number} amount satoshis to be sent
     * @return {Transaction} this, for chaining
     */
    fee(amount: number): this;

    /**
     * Manually set the fee per KB for this transaction. Beware that this resets all the signatures
     * for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
     * be reset).
     *
     * @param {number} amount satoshis per KB to be sent
     * @return {Transaction} this, for chaining
     */
    feePerKb(amount: number): this;

    /**
     * Manually set the fee per Byte for this transaction. Beware that this resets all the signatures
     * for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
     * be reset).
     * fee per Byte will be ignored if fee per KB is set
     *
     * @param {number} amount satoshis per Byte to be sent
     * @return {Transaction} this, for chaining
     */
    feePerByte(amount: number): this;

    /**
     * Set the change address for this transaction
     *
     * Beware that this resets all the signatures for inputs (in further versions,
     * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
     *
     * @param {Address} address An address for change to be sent to.
     * @return {Transaction} this, for chaining
     */
    change(address: Address): this;

    /**
     * @return {Output} change output, if it exists
     */
    getChangeOutput(): Transaction.Output | null;

    /**
     * @typedef {Object} Transaction~toObject
     * @property {(string|Address)} address
     * @property {number} satoshis
     */

    /**
     * Add an output to the transaction.
     *
     * Beware that this resets all the signatures for inputs (in further versions,
     * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
     *
     * @param {(string|Address|Array.<Transaction~toObject>)} address
     * @param {number} amount in satoshis
     * @return {Transaction} this, for chaining
     */
    to(
      address:
        | string
        | Address
        | Array<{ address: string | Address; satoshis: number }>,
      amount: number,
    ): this;

    /**
     * Add an OP_RETURN output to the transaction.
     *
     * Beware that this resets all the signatures for inputs (in further versions,
     * SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).
     *
     * @param {Buffer|string} value the data to be stored in the OP_RETURN output.
     *    In case of a string, the UTF-8 representation will be stored
     * @return {Transaction} this, for chaining
     */
    addData(value: Buffer | string): this;

    /**
     * Add an output to the transaction.
     *
     * @param {Output} output the output to add.
     * @return {Transaction} this, for chaining
     */
    addOutput(output: Transaction.Output): this;

    /**
     * Remove all outputs from the transaction.
     *
     * @return {Transaction} this, for chaining
     */
    clearOutputs(): this;

    /**
     * Calculates the fee of the transaction.
     *
     * If there's a fixed fee set, return that.
     *
     * If there is no change output set, the fee is the
     * total value of the outputs minus inputs. Note that
     * a serialized transaction only specifies the value
     * of its outputs. (The value of inputs are recorded
     * in the previous transaction outputs being spent.)
     * This method therefore raises a "MissingPreviousOutput"
     * error when called on a serialized transaction.
     *
     * If there's no fee set and no change address,
     * estimate the fee based on size.
     *
     * @return {Number} fee of this transaction in satoshis
     */
    getFee(): number;

    removeOutput(index: number): void;

    /**
     * Sort a transaction's inputs and outputs according to BIP69
     *
     * @see {https://github.com/bitcoin/bips/blob/master/bip-0069.mediawiki}
     * @return {Transaction} this
     */
    sort(): this;

    /**
     * Randomize this transaction's outputs ordering. The shuffling algorithm is a
     * version of the Fisher-Yates shuffle, provided by lodash's _.shuffle().
     *
     * @return {Transaction} this
     */
    shuffleOutputs(): this;

    /**
     * Sort this transaction's outputs, according to a given sorting function that
     * takes an array as argument and returns a new array, with the same elements
     * but with a different order. The argument function MUST NOT modify the order
     * of the original array
     *
     * @param {Function} sortingFunction
     * @return {Transaction} this
     */
    sortOutputs(sortingFunction: () => Transaction.Output[]): this;

    /**
     * Sort this transaction's inputs, according to a given sorting function that
     * takes an array as argument and returns a new array, with the same elements
     * but with a different order.
     *
     * @param {Function} sortingFunction
     * @return {Transaction} this
     */
    sortInputs(sortingFunction: () => Transaction.Input[]): this;

    removeInput(txId: string | number, outputIndex: number): void;

    /**
     * Sign the transaction using one or more private keys.
     *
     * It tries to sign each input, verifying that the signature will be valid
     * (matches a public key).
     *
     * @param {Array|String|PrivateKey} privateKey
     * @param {number} sigtype
     * @return {Transaction} this, for chaining
     */
    sign(privateKey: string | PrivateKey | Array<string | PrivateKey>): this;

    getSignatures(
      privKey: string,
      sigtype?: number,
      signingMethod?: unknown,
    ): unknown[];

    /**
     * Add a signature to the transaction
     *
     * @param {Object} signature
     * @param {number} signature.inputIndex
     * @param {number} signature.sigtype
     * @param {PublicKey} signature.publicKey
     * @param {Signature} signature.signature
     * @param {String} signingMethod "ecdsa" or "schnorr"
     * @return {Transaction} this, for chaining
     */
    applySignature(
      signature: {
        inputIndex: number;
        sigtype: number;
        publicKey: PublicKey;
        signature: Transaction.Signature;
      },
      signingMethod: string,
    ): this;

    isFullySigned(): boolean;

    isValidSignature(): boolean;

    /**
     * @returns {boolean} whether the signature is valid for this transaction input
     */
    verifySignature(): boolean;

    /**
     * Check that a transaction passes basic sanity tests. If not, return a string
     * describing the error. This function contains the same logic as
     * CheckTransaction in bitcoin core.
     */
    verify(): string | boolean;

    /**
     * Analogous to bitcoind's IsCoinBase function in transaction.h
     */
    isCoinbase(): boolean;

    setVersion(version: number): this;
  }
}
