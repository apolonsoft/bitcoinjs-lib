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
export interface NetworkConfig {
    bitcoin: Network;
    testnet: Network;
    dogcoin: Network;
    peercoin: Network;
    [key: string]: Network;
}
export declare const networkConfig: NetworkConfig;
export {};
