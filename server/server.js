
'use strict';
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 8964;
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const testNetworkRoot = path.resolve(require('os').homedir(), 'fabric-samples/test-network');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



async function initGateway() {
    try {
        const wallet = await Wallets.newFileSystemWallet('/home/ubuntu/wallet');

        const predefinedOrgs = [
            {
                name: 'org1.example.com',
                mspId: 'Org1MSP',
                users: ['Admin', 'User1']
            }, {
                name: 'org2.example.com',
                mspId: 'Org2MSP',
                users: ['Admin', 'User1']
            }
        ];
        let allUsers = ["Alice@org2.example.com","Bob@org2.example.com", "CAAdmin@org1.example.com"]
        for (const org of predefinedOrgs) {
            const credPath = path.join(testNetworkRoot, '/organizations/peerOrganizations/', org.name, '/users');

            for (const user of org.users) {
                const mspFolderPath = path.join(credPath, `${user}@${org.name}`, '/msp');

                // expecting only one cert file and one key file to be in the directories
                const certFile = path.join(mspFolderPath, '/signcerts/', fs.readdirSync(path.join(mspFolderPath, '/signcerts'))[0]);
                const keyFile = path.join(mspFolderPath, '/keystore/', fs.readdirSync(path.join(mspFolderPath, '/keystore'))[0]);

                const cert = fs.readFileSync(certFile).toString();
                const key = fs.readFileSync(keyFile).toString();

                const identity = {
                    credentials: {
                        certificate: cert,
                        privateKey: key,
                    },
                    mspId: org.mspId,
                    type: 'X.509',
                };

                const identityLabel = `${user}@${org.name}`;
                await wallet.put(identityLabel, identity);
                // console.log(`wallet put ${identityLabel}`);
            }
        }

        let contracts = {}
        allUsers.forEach(async identityLabel => {
            const gateway = new Gateway();
            const orgName = identityLabel.split('@')[1];
            const orgNameWithoutDomain = orgName.split('.')[0];

            const connectionProfile = JSON.parse(fs.readFileSync(
                path.join(testNetworkRoot,
                    'organizations/peerOrganizations',
                    orgName,
                    `/connection-${orgNameWithoutDomain}.json`), 'utf8')
            );

            const connectionOptions = {
                identity: identityLabel,
                wallet: wallet,
                discovery: { enabled: true, asLocalhost: true }
            };

            // console.log('Connect to a Hyperledger Fabric gateway.');
            await gateway.connect(connectionProfile, connectionOptions);

            // console.log('Use channel "mychannel".');
            const network = await gateway.getNetwork('mychannel');

            // console.log('Use hyperForex.');
            const contract = network.getContract('hyperForex');
            contracts[identityLabel] = contract
        })
        return contracts;
    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

const contracts = await initGateway()


app.get('/balance', async (req, res) => {
    try {
        const userID = req.params.userID
        console.log(`get balance, userID: ${userID}`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        // submitTransaction
        const data = await contract.evaluateTransaction("balance", userID)
        const json = JSON.parse(data.toString())
        console.log(json)

        res.json({ success: true, data: json});
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({ message: `Error processing transaction. ${error}` });
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
