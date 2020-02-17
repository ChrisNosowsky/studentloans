export declare module BlockChainModule {
    class BlockchainClient {
        connectToNetwork(): Promise<{
            contract: import("fabric-network").Contract;
            network: import("fabric-network").Network;
        } | undefined>;
        issue(args: any): Promise<any>;
        queryByKey(keyPassed: any): Promise<any>;
    }
}
