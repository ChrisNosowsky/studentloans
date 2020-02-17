"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yaml = require("js-yaml");
const fabric_network_1 = require("fabric-network");
// A wallet stores a collection of identities for use
const wallet = new fabric_network_1.FileSystemWallet('./local_fabric/wallet');
var BlockChainModule;
(function (BlockChainModule) {
    class BlockchainClient {
        async connectToNetwork() {
            const gateway = new fabric_network_1.Gateway();
            try {
                console.log('connecting to Fabric network...');
                const identityLabel = 'Admin@org1.example.com';
                let connectionProfile = yaml.safeLoad(fs.readFileSync('./student/api/gateway/networkConnection.yaml', 'utf8'));
                let connectionOptions = {
                    identity: identityLabel,
                    wallet: wallet,
                    discovery: {
                        asLocalhost: true
                    }
                };
                // Connect to gateway using network.yaml file and our certificates in _idwallet directory
                await gateway.connect(connectionProfile, connectionOptions);
                console.log('Connected to Fabric gateway.');
                // Connect to our local fabric
                const network = await gateway.getNetwork('mychannel');
                console.log('Connected to mychannel. ');
                // Get the contract we have installed on the peer
                const contract = await network.getContract('loanContract');
                let networkObj = {
                    contract: contract,
                    network: network
                };
                return networkObj;
            }
            catch (error) {
                console.log(`Error processing transaction. ${error}`);
                console.log(error.stack);
            }
            finally {
                console.log('Done connecting to network.');
                // gateway.disconnect();
            }
        }
        // async redeem(args: any) {
        //   console.log('args for redeem: ')
        //   console.log(args)
        //   let response = await args.contract.submitTransaction(args.function,
        //     args.issuer, args.paperNumber, args.redeemingOwner, args.redeemDateTime
        //   );
        //   return response;
        // }
        async issue(args) {
            console.log('args for issue: ');
            console.log(args);
            let response = await args.contract.submitTransaction(args.function, args.issuer, args.LoanID, args.CustomerID, args.LoanName, args.BeginDate, args.BeginAmt, args.numPayments);
            return response;
        }
        async queryByKey(keyPassed) {
            let response = await keyPassed.contract.submitTransaction('query', keyPassed.id);
            console.log('query by key response: ');
            console.log(JSON.parse(response.toString()));
            console.log(response.length);
            if (response.length === 2) {
                response = `${keyPassed.id} does not exist`;
                return response;
            }
            response = JSON.parse(response.toString());
            return response;
        }
    }
    BlockChainModule.BlockchainClient = BlockchainClient;
})(BlockChainModule = exports.BlockChainModule || (exports.BlockChainModule = {}));
//# sourceMappingURL=blockchainClient.js.map