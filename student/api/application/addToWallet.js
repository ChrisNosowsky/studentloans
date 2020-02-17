import { readFileSync } from 'fs';
import { FileSystemWallet, X509WalletMixin } from 'fabric-network';
import { resolve, join } from 'path';

const fixtures = resolve(__dirname, '../../../../basic-network');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('../identity/user/balaji/wallet');



async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = join(fixtures, '/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com');
        const cert = readFileSync(join(credPath, '/msp/signcerts/Admin@org1.example.com-cert.pem')).toString();
        const key = readFileSync(join(credPath, '/msp/keystore/cd96d5260ad4757551ed4a5a991e62130f8008a0bf996e4e4b84cd097a747fec_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'Admin@org1.example.com';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});