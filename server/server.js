
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
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/enrollUser', async (req, res) => {
    try {
        const { identityLabel, enrollmentID, enrollmentSecret, enrollmentAttributes } = req.body;

        const orgName = identityLabel.split('@')[1];
        const orgNameWithoutDomain = orgName.split('.')[0];

        // Read the connection profile.
        const connectionProfile = JSON.parse(
            fs.readFileSync(
                path.join(
                    testNetworkRoot,
                    'organizations/peerOrganizations',
                    orgName,
                    `/connection-${orgNameWithoutDomain}.json`
                ),
                'utf8'
            )
        );

        // Create a new CA client for interacting with the CA.
        const ca = new FabricCAServices(connectionProfile.certificateAuthorities[`ca.${orgName}`].url);

        // Create a new FileSystemWallet object for managing identities.
        const wallet = await Wallets.newFileSystemWallet('/home/ubuntu/wallet');

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(identityLabel);
        if (identity) {
            return res.status(400).json({ message: `An identity for the ${identityLabel} user already exists in the wallet` });
        }

        // Enroll the user and import the new identity into the wallet.
        let enrollmentAttributesArr = [];
        if (enrollmentAttributes && enrollmentAttributes.length > 0) {
            enrollmentAttributesArr = JSON.parse(enrollmentAttributes);
        }

        const enrollmentRequest = {
            enrollmentID: enrollmentID,
            enrollmentSecret: enrollmentSecret,
            attr_reqs: enrollmentAttributesArr
        };
        const enrollment = await ca.enroll(enrollmentRequest);

        const orgNameCapitalized = orgNameWithoutDomain.charAt(0).toUpperCase() + orgNameWithoutDomain.slice(1);
        const newIdentity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: `${orgNameCapitalized}MSP`,
            type: 'X.509'
        };

        await wallet.put(identityLabel, newIdentity);
        console.log(`Successfully enrolled ${identityLabel} user and imported it into the wallet`);

        return res.json({ message: `Successfully enrolled ${identityLabel} user and imported it into the wallet` });
    } catch (error) {
        console.error(`Failed to enroll user: ${error}`);
        return res.status(500).json({ message: `Failed to enroll user: ${error}` });
    }
});



app.post('/registerUser', async (req, res) => {
    try {
        const { registrarLabel, enrollmentID, optional } = req.body;

        // Create a new FileSystemWallet object for managing identities.
        const wallet = await Wallets.newFileSystemWallet('/home/ubuntu/wallet');

        // Check to see if we've already enrolled the registrar user.
        const registrarIdentity = await wallet.get(registrarLabel);
        if (!registrarIdentity) {
            return res.status(400).json({ message: `An identity for the registrar user ${registrarLabel} does not exist in the wallet` });
        }

        const orgName = registrarLabel.split('@')[1];
        const orgNameWithoutDomain = orgName.split('.')[0];

        // Read the connection profile.
        const connectionProfile = JSON.parse(
            fs.readFileSync(
                path.join(
                    testNetworkRoot,
                    'organizations/peerOrganizations',
                    orgName,
                    `/connection-${orgNameWithoutDomain}.json`
                ),
                'utf8'
            )
        );

        // Create a new CA client for interacting with the CA.
        const ca = new FabricCAServices(connectionProfile.certificateAuthorities[`ca.${orgName}`].url);

        const provider = wallet.getProviderRegistry().getProvider(registrarIdentity.type);
        const registrarUser = await provider.getUserContext(registrarIdentity, registrarLabel);

        // optional parameters
        const { secret = '', attrs = [] } = optional || {};

        // Register the user and return the enrollment secret.
        const registerRequest = {
            enrollmentID: enrollmentID,
            enrollmentSecret: secret,
            role: 'client',
            attrs: attrs
        };
        const registeredSecret = await ca.register(registerRequest, registrarUser);
        console.log(`Successfully registered the user with the ${enrollmentID} enrollment ID and ${registeredSecret} enrollment secret.`);

        return res.json({
            message: `Successfully registered the user with the ${enrollmentID} enrollment ID and ${registeredSecret} enrollment secret.`
        });
    } catch (error) {
        console.error(`Failed to register user: ${error}`);
        return res.status(500).json({ message: `Failed to register user: ${error}` });
    }
});




async function addToWallet() {
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
                console.log(`wallet put ${identityLabel}`);
            }
        }
        return wallet;
    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

async function connectToGateway(identityLabel, functionName, chaincodeArgs) {
    const gateway = new Gateway();
    const wallet = await addToWallet();

    try {
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

        console.log('Connect to a Hyperledger Fabric gateway.');
        await gateway.connect(connectionProfile, connectionOptions);

        console.log('Use channel "mychannel".');
        const network = await gateway.getNetwork('mychannel');

        console.log('Use hyperForex.');
        const contract = network.getContract('hyperForex');

        console.log('Submit ' + functionName + ' transaction.');
        // it can't be process ...
        // const response = await contract.submitTransaction(functionName, ...chaincodeArgs);
        const response = await contract.submitTransaction(functionName, chaincodeArgs);
        if (`${response}` !== '') {
            console.log(`Response from ${functionName}: ${response}`);
        }
        return response;
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        throw error;
    } finally {
        console.log('Disconnect from the gateway.');
        gateway.disconnect();
    }
}

app.post('/submitTrans', async (req, res) => {
    try {
        const { identityLabel, functionName, chaincodeArgs } = req.body;
        console.log(`identityLabel : ${identityLabel} , functionName: ${functionName} , chaincodeArgs: ${chaincodeArgs}`)

        const response = await connectToGateway(identityLabel, functionName, chaincodeArgs);
        res.json({ response });
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({ message: `Error processing transaction. ${error}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
