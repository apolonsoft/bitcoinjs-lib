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
declare const bitcoin: NetworkConfig;
declare const litecoin: NetworkConfig;
declare const dogecoin: NetworkConfig;
declare const emercoin: NetworkConfig;
declare const dashcoin: NetworkConfig;
declare const bitcoinsv: NetworkConfig;
export { bitcoin, litecoin, bitcoinsv, dogecoin, emercoin, dashcoin };
