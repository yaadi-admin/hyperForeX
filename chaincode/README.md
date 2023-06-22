# HyperForex-chaincode

# network

Use the fabric-samples to deploy a test network.

It has two organizations:

* org1: We use org1 as admin. Only users from org1 can access Admin API.
* org2: Normal users are in the org2.

We provide three users:

* CAAdmin@org1.example.com : Who can access the admin API.
* Alice@org2.example.com: Normal user.
* Bob@org2.example.com: Normal user. 


# ChainCode API

# 1. Admin API

There will be a centralized organization to manage the platform.

### 1.1 addCurrency

Add a new currency to the platform. 

In this platform, the base currency is USD. Other currencies will have an exchange rate of USD. 

If users want to exchange money from one currency for another, it will be exchanged for USD first. For example: 

- User A wants to exchange 100 INR for CAD.
- During the exchange:
    - Get the USD value.
    - Get the CAD value
    - Change the balance.

Parameters:

- currency: string type. Examples: CNY, CAD, INR
- exchangeRateToUSD: double.  Amount * exchangeRateToUSD = Amount of USD

### 1.2 updateRate

Change the current exchange rate of one currency.

Parameters:

- currency: string type. Examples: CNY, CAD, INR
- exchangeRateToUSD: double.  Amount * exchangeRateToUSD = Amount of USD

### 1.3 depositMoney

The platform will confirm the deposit and change the balance of users’ accounts.

Parameters:

- userID: String type.
- currency: String type.
- amount: Double.

### 1.4 withdrawMoney

Users may withdraw money from the platform. They may get paper money or bank transfer.

After that, the platform needs to update the balance of users.

Parameters: 

- userID: String type.
- currency: String type.
- amount: Double.

## 2. User API

### 2.1 initAccount

Initiate the account. An account needs to call this function before calling other functions.

Parameters: 

- userID: String type. Use the email address as the unique ID.

### 2.2 transfer

Users can transfer money to others for purchasing or other purposes.

Parameters: 

- idFrom: String type.
- idTo: String type.
- currency: String type.
- amount: Double.

### 2.3 balance

Users can get all the balance information of their accounts.

Parameters:

- userID: String type. User ID.

Return:

It will return a JSON string.  Like this:

```jsx
[{"currency": "CAD", "balance": 0.00}, {"currency": "USD", "balance": 100.00}]
```

### 2.4 exchangeCurrency

Users can exchange one currency to another.

Parameters:

- userID: String type.  User ID.
- currencyFrom: String type.
- currencyTo: String type.
- amountFrom: Double.
- amountTo: Double.

There will be two kinds of exchange:

- Spend a fixed amount of currencyFrom. Use `amountFrom`  , leaving amountTo as 0.
- To get a target amount of currencyTo. Use `amountTo` , leaving amountFrom as 0.

Return:

It will return a JSON string.  Like this:

```jsx
{
"amountFrom": 100,
"amountTo": 85.2,
"balanceOfCurrencyFrom": 10,
"balanceOfCurrencyTO": 85.2
}
```

If users don’t have enough balance, it will throw an error.

# 3. Public API

There will be some information that every can query without accounts.

### 3.1 currencyList

Return all the currencies supported in this platform and their exchange rate to USD.

No Parameters

Return: 

It will return a JSON string.  Like this:

```jsx
[{"currency": "CAD", "exchangeRateToUSD": 0.75}, {"currency": "USD", "balance": 1}]
```

## Test in test network

```jsx

./network.sh up createChannel -ca -s couchdb 

npm install

./network.sh deployCC -ccn hyperForex -ccv 1.0 -ccp ~/HyperForex-chaincode -ccl javascript


export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

Invoke Command:
peer chaincode invoke \
    -o localhost:7050 \
    --ordererTLSHostnameOverride orderer.example.com \
    --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
    -C mychannel \
    -n hyperForex \
    --peerAddresses localhost:7051 \
    --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
    --peerAddresses localhost:9051 \
    --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt \
   -c    

'{"function":"initAccount","Args":["admin@org1.example.com"]}'
'{"function":"currencyList","Args":[]}'
'{"function":"addCurrency","Args":["USD", "1.0"]}'
'{"function":"addCurrency","Args":["CAD", "0.75"]}'
'{"function":"balance","Args":["admin@org1.example.com"]}'

'{"function":"updateRate","Args":["CAD", "0.7"]}'
'{"function":"depositMoney","Args":["admin@org1.example.com", "USD", "100"]}'
'{"function":"withdrawMoney","Args":["admin@org1.example.com", "USD", "50"]}'

'{"function":"exchangeCurrency","Args":["admin@org1.example.com", "USD", "CAD", "50", "0"]}'
'{"function":"exchangeCurrency","Args":["admin@org1.example.com", "CAD", "USD", "0", "40"]}'

// change to user2
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

 '{"function":"initAccount","Args":["user2@org2.example.com"]}'
 '{"function":"balance","Args":["user2@org2.example.com"]}'

// change to admin
'{"function":"depositMoney","Args":["user2@org2.example.com", "USD", "1000"]}'
'{"function":"depositMoney","Args":["user2@org2.example.com", "CAD", "1000"]}'
'{"function":"transfer","Args":["admin@org1.example.com", "user2@org2.example.com", "USD", "50"]}'

// change to user2
'{"function":"transfer","Args":["user2@org2.example.com", "admin@org1.example.com", "USD", "100"]}'

```
