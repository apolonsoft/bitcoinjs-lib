'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.networkConfig = {
  bitcoin: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
    dustThreshold: 546,
    timeInTransaction: false,
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
    dustThreshold: 546,
    timeInTransaction: false,
  },
  dogcoin: {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bech32: 'xdg',
    bip32: {
      public: 0x02facafd,
      private: 0x02fac398,
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
    dustThreshold: 0,
    timeInTransaction: false,
  },
  peercoin: {
    messagePrefix: '\x17PPcoin Signed Message:\n',
    bech32: 'pc',
    bip32: {
      public: 0x01da950b,
      private: 0x01da90d0,
    },
    pubKeyHash: 0x37,
    scriptHash: 0x75,
    wif: 0xb7,
    dustThreshold: 0,
    timeInTransaction: true,
  },
};
