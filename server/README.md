
# gateway

The gateway service is deployed in a AWS EC. The endpoint is http://3.89.88.181:8964/

# roles

* org1: We use org1 as admin. Only users from org1 can access Admin API.
* org2: Normal users are in the org2.

We provide three users:

* CAAdmin@org1.example.com : Who can access the admin API.
* Alice@org2.example.com: Normal user.
* Bob@org2.example.com: Normal user. 


# Common parameters and result structure

In the request, almost all requests will have a userID. It means this request is invoked by this user.

In the response, the structure is : {success: true/false, data: {}, message: ""}

* success: If everything is okay, it will be true. If errors happen, it will be false.
* data: It's a JSON object.
* message: If there is an error, the message will show the detailed error.

# 1. Admin API

There will be a centralized organization to manage the platform.

### 1.1 addCurrency

POST API

Add a new currency to the platform. 

In this platform, the base currency is USD. Other currencies will have an exchange rate of USD. 

If users want to exchange money from one currency for another, it will be exchanged for USD first. For example: 

- User A wants to exchange 100 INR for CAD.
- During the exchange:
    - Get the USD value.
    - Get the CAD value
    - Change the balance.

Parameters:

- userID
- currency: string type. Examples: CNY, CAD, INR
- exchangeRateToUSD: double.  Amount * exchangeRateToUSD = Amount of USD



### 1.2 updateRate

POST API

Change the current exchange rate of one currency.

Parameters:

- userID
- currency: string type. Examples: CNY, CAD, INR
- exchangeRateToUSD: double.  Amount * exchangeRateToUSD = Amount of USD

### 1.3 depositMoney

POST API

The platform will confirm the deposit and change the balance of users’ accounts.

Parameters:

- userID: String type. It can only be called by admin users.
- depositTo: String type. Who will receive the money.
- currency: String type.
- amount: Float.

### 1.4 withdrawMoney

POST API

Users may withdraw money from the platform. They may get paper money or bank transfer.

After that, the platform needs to update the balance of users.

Parameters: 

- userID: String type.It can only be called by admin users.
- withdrawFrom: String type. Who will withdraw the money.
- currency: String type.
- amount: Double.

## 2. User API

### 2.1 initAccount

POST API

Initiate the account. An account needs to call this function before calling other functions.

We don't need this API because we have a fixed user list.

Parameters: 

- userID: String type.


### 2.2 transfer

POST API

Users can transfer money to others for purchasing or other purposes.

Parameters: 

- userID: String type.
- transferTo: String type.  Who will receive the money.
- currency: String type.
- amount: Double.

### 2.3 balance

GET API

Users can get all the balance information of their accounts.

Parameters:

- userID: String type. User ID.

Return:

It will return a JSON string.  Like this:

```jsx
[{"currency": "CAD", "balance": 0.00}, {"currency": "USD", "balance": 100.00}]
```

### 2.4 exchangeCurrency

POST API

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

### 2.5 history

GET API

get the history of 4 types of actions:

* depositMoney
* withdrawMoney
* transfer
* exchangeCurrency

Parameters:

* userID: String type.  User ID.
* type: the type of transactions.


Return:

{success, data:[{history}]}

History object is different for each type.

* for depositMoney: 
    * depositTo
    * currency
    * amount
    * createdAt: time
* for withdrawMoney: 
    * withdrawFrom
    * currency
    * amount
    * createdAt: time
* for transfer: 
    * userID: Money is transfered from this person.
    * transferTo: Who received money.
    * currency
    * amount
    * createdAt: time
* for exchangeCurrency: 
    * userID
    * currencyFrom
    * currencyTo
    * amountFrom
    * amountTo
    * createdAt: time


# 3. Public API

There will be some information that every can query without accounts.

### 3.1 currencyList

GET API

Return all the currencies supported in this platform and their exchange rate to USD.

No Parameters

Return: 

It will return a JSON string.  Like this:

```jsx
[{"currency": "CAD", "exchangeRateToUSD": 0.75}, {"currency": "USD", "balance": 1}]
```
