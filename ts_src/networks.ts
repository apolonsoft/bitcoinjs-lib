// https://en.bitcoin.it/wiki/List_of_address_prefixes
// Dogecoin BIP32 is a proposed standard: https://bitcointalk.org/index.php?topic=409731
export interface Network {
  messagePrefix: string;
  bech32: string;
  bip32: Bip32;
  pubKeyHash: number;
  scriptHash: number;
  wif: number;
  dustThreshold: number;
  timeInTransaction: boolean;
}

interface Bip32 {
  public: number;
  private: number;
}

export interface NetworkConfig  {
  bitcoin: Network;
  testnet: Network;
  dogcoin: Network;
  peercoin: Network;
  [key: string]: Network;
}

export const networkConfig: NetworkConfig = {
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
