
'use strict';
const fs = require('fs');
const path = require('path');
const express = require('express');
const historyModule = require('./history')
const app = express();
const port = 8964;
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const testNetworkRoot = path.resolve(require('os').homedir(), 'fabric-samples/test-network');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors())
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

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

let contracts
(async () => {
    contracts = await initGateway()
})()



app.get('/balance', async (req, res) => {
    try {
        const userID = req.query.userID
        console.log(`get balance, userID: ${userID}`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        const data = await contract.evaluateTransaction("balance", userID)
        const json = JSON.parse(data.toString())
        console.log(json)

        res.json({ success: true, data: json});
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})

app.get('/currencyList', async (req, res) => {
    try {
        const userID = "Alice@org2.example.com"
        console.log(`get currencyList`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        const data = await contract.evaluateTransaction("currencyList")
        const json = JSON.parse(data.toString())
        console.log(json)

        res.json({ success: true, data: json});
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})


app.post('/transfer', async (req, res) => {
    try {
        const {userID, transferTo, currency, amount} = req.body
        console.log(`post transfer`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        await contract.submitTransaction("transfer", userID, transferTo, currency, amount)
        res.json({ success: true});

        try {
            historyModule.createHistory("transfer", {
                userID,
                transferTo,
                currency,
                amount
            })
        } catch (error) {
            console.log("historyModule.createHistory error:")
            console.log(error)
        }
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})

app.post('/exchangeCurrency', async (req, res) => {
    try {
        const {userID, currencyFrom, currencyTo, amountFrom, amountTo} = req.body
        console.log(`post exchangeCurrency`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        const data = await contract.submitTransaction("exchangeCurrency", userID, currencyFrom, currencyTo, amountFrom, amountTo)
        const json = JSON.parse(data.toString())
        console.log(json)
        res.json({ success: true, data: json});

        try {
            historyModule.createHistory("exchangeCurrency", {
                userID,
                currencyFrom,
                currencyTo,
                amountFrom,
                amountTo
            })
        } catch (error) {
            console.log("historyModule.createHistory error:")
            console.log(error)
        }
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})

// we don't need this API.
app.post('/initAccount', async (req, res) => {
    try {
        const {userID} = req.body
        console.log(`post initAccount`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        await contract.submitTransaction("initAccount", userID)
        res.json({ success: true});
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})

app.post('/addCurrency', async (req, res) => {
    try {
        const {userID, currency, exchangeRateToUSD} = req.body
        console.log(`post addCurrency`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        await contract.submitTransaction("addCurrency", currency, exchangeRateToUSD)
        res.json({ success: true});
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})

app.post('/updateRate', async (req, res) => {
    try {
        const {userID, currency, exchangeRateToUSD} = req.body
        console.log(`post updateRate`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        await contract.submitTransaction("updateRate", currency, exchangeRateToUSD)
        res.json({ success: true});
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})

app.post('/depositMoney', async (req, res) => {
    try {
        const {userID, depositTo, currency, amount} = req.body
        console.log(`post depositMoney`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        await contract.submitTransaction("depositMoney", depositTo, currency, amount)
        res.json({ success: true});

        try {
            historyModule.createHistory("depositMoney", {
                userID,
                depositTo,
                currency,
                amount
            })
        } catch (error) {
            console.log("historyModule.createHistory error:")
            console.log(error)
        }
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})

app.post('/withdrawMoney', async (req, res) => {
    try {
        const {userID, withdrawFrom, currency, amount} = req.body
        console.log(`post withdrawMoney`)

        const contract = contracts[userID]
        if (contract == undefined) {
            return res.json({success: false, message: `not support userid ${userID}`})
        }
        await contract.submitTransaction("withdrawMoney", withdrawFrom, currency, amount)
        res.json({ success: true});

        try {
            historyModule.createHistory("withdrawMoney", {
                userID,
                withdrawFrom,
                currency,
                amount
            })
        } catch (error) {
            console.log("historyModule.createHistory error:")
            console.log(error)
        }
    } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        res.status(500).json({success: false, message: `Error processing transaction. ${error}` });
    }
})


app.get('/history', async (req, res) => {
    try {
        const userID = req.query.userID
        const type = req.query.type
        console.log(`get history, userID: ${userID} , type : ${type}`)

        let list
        if (type == "depositMoney") {
            list = await historyModule.getDepositHistory(userID)
        } else if (type == "withdrawMoney") {
            list = await historyModule.getWithdrawHistory(userID)
        } else if (type == "transfer") {
            list = await historyModule.getTransferHistory(userID)
        } else if (type == "exchangeCurrency") {
            list = await exchangeCurrency.getExchangeHistory(userID)
        } else {
            res.json({success: false, message: "don't support this type of history!!"})
            return
        }
        res.json({ success: true, data: list});
    } catch (error) {
        console.log(`get history failed. ${error}`);
        res.status(500).json({success: false, message: `get history failed. ${error}` });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
