'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const bitcoin = {
  mainnet: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  regtest: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bcrt',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
  testnet: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
};
exports.bitcoin = bitcoin;
const litecoin = {
  mainnet: {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
  },
  testnet: {
    messagePrefix: '\x18Litecoin Signed Message:\n',
    bech32: 'tltc',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
};
exports.litecoin = litecoin;
const dogecoin = {
  mainnet: {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bech32: 'xdg',
    bip32: {
      public: 0x02facafd,
      private: 0x02fac398,
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
  },
  testnet: {
    messagePrefix: '\x18Dogecoin Signed Message:\n',
    bech32: 'xdg',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x71,
    scriptHash: 0xc4,
    wif: 0xf1,
  },
};
exports.dogecoin = dogecoin;
const emercoin = {
  mainnet: {
    messagePrefix: '\x18Emercoin Signed Message:\n',
    bech32: 'emc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  testnet: {
    messagePrefix: '\x18Emercoin Signed Message:\n',
    bech32: 'emc',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
};
exports.emercoin = emercoin;
const dashcoin = {
  mainnet: {
    messagePrefix: '\x18Dashcoin Signed Message:\n',
    bech32: 'dash',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x4c,
    scriptHash: 0x10,
    wif: 0xcc,
  },
  testnet: {
    messagePrefix: '\x18Dashcoin Signed Message:\n',
    bech32: 'dash',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x8c,
    scriptHash: 0x13,
    wif: 0xef,
  },
};
exports.dashcoin = dashcoin;
const bitcoinsv = {
  mainnet: {
    messagePrefix: 'unused',
    bech32: 'bsv',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  testnet: {
    messagePrefix: 'unused',
    bech32: 'bsvtest',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0x80,
  },
};
exports.bitcoinsv = bitcoinsv;
