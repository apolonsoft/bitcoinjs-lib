// https://en.bitcoin.it/wiki/List_of_address_prefixes
// Dogecoin BIP32 is a proposed standard: https://bitcointalk.org/index.php?topic=409731
export interface Network {
  messagePrefix: string;
  bech32: string;
  bip32: Bip32;
  pubKeyHash: number;
  scriptHash: number;
  wif: number;
}

interface Bip32 {
  public: number;
  private: number;
}

interface NetworkConfig {
  mainnet: Network;
  testnet: Network;
  regtest?: Network;
}

const bitcoin: NetworkConfig = {
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

const litecoin: NetworkConfig = {
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

const dogecoin: NetworkConfig = {
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

const emercoin: NetworkConfig = {
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

const dashcoin: NetworkConfig = {
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

const bitcoinsv: NetworkConfig = {
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

export { bitcoin, litecoin, bitcoinsv, dogecoin, emercoin, dashcoin };
