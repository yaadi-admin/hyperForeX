const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    // deposit
    depositTo: {
      type: String,
      required: false,
    },
    currency: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: false,
    },

    // widthdraw
    withdrawFrom: {
      type: String,
      required: false,
    },
    // currency
    // amount

    // transfer
    transferTo: {
      type: String,
      required: false,
    },
    // currency
    // amount

    // exchangeCurrency
    currencyFrom: {
      type: String,
      required: false,
    },
    currencyTo: {
      type: String,
      required: false,
    },
    amountFrom: {
      type: String,
      required: false,
    },
    amountTo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const HistoryModel = mongoose.model("History", transactionSchema);

let connectionString =
  "mongodb+srv://sheldon:vRVbVKYtVKt9OUNO@cluster0.3nadhou.mongodb.net/Blockchain?retryWrites=true&w=majority";

let connected;

//connection to mongoose
mongoose.connect(connectionString, { useNewUrlParser: true }).then(
  () => {
    connected = true;
    console.log("Mongoose connected successfully to Mongo DB");
    // delete all transactions, for testing.
    // transactionModel.deleteMany({}, (err) => {
    //     if (err != null) {
    //         console.log(`delete all failed`)
    //         console.log(err)
    //     } else {
    //         console.log(`successfully delete all transactions`)
    //     }
    // })
  },
  (error) => {
    connected = false;
    console.log("Mongoose could not connected to database: " + error);
  }
);

// historyType: depositMoney, withdrawMoney, transfer,exchangeCurrency
async function createHistory(historyType, data) {
  let history = {userID: data.userID};
  if (historyType == "depositMoney") {
    history.type = historyType;
    history.depositTo = data.depositTo;
    history.currency = data.currency;
    history.amount = data.amount;
  } else if (historyType == "withdrawMoney") {
    history.type = historyType;
    history.withdrawFrom = data.withdrawFrom;
    history.currency = data.currency;
    history.amount = data.amount;
  } else if (historyType == "transfer") {
    history.type = historyType;
    history.transferTo = data.transferTo;
    history.currency = data.currency;
    history.amount = data.amount;
  } else if (historyType == "exchangeCurrency") {
    history.type = historyType;
    history.currencyFrom = data.currencyFrom;
    history.currencyTo = data.currencyTo;
    history.amountFrom = data.amountFrom;
    history.amountTo = data.amountTo;
  } else {
    console.log("unknown historyType ");
    return;
  }

  // store date to mongodb
  await HistoryModel.create(history);
  return history;
}

// transfer,
async function getTransferHistory(userID) {
  if (connected === undefined) {
    await new Promise((r) => setTimeout(r, 3000));
  }
  if (!connected) {
    console.log("Mongoose could not connected to database");
    return [];
  } else {
    const historys = await HistoryModel.find({
      type: "transfer",
      userID: userID,
    })
      .sort({ createAt: -1 })
      .exec();
    console.log(`historys amount : ${historys.length}`);
    return historys;
  }
}

// exchange
async function getExchangeHistory(userID) {
  if (connected === undefined) {
    await new Promise((r) => setTimeout(r, 3000));
  }
  if (!connected) {
    console.log("Mongoose could not connected to database");
    return [];
  } else {
    const historys = await HistoryModel.find({
      type: "exchangeCurrency",
      userID: userID,
    })
      .sort({ createAt: -1 })
      .exec();
    console.log(`historys amount : ${historys.length}`);
    return historys;
  }
}

// deposit
async function getDepositHistory(userID) {
  if (connected === undefined) {
    await new Promise((r) => setTimeout(r, 3000));
  }
  if (!connected) {
    console.log("Mongoose could not connected to database");
    return [];
  } else {
    const historys = await HistoryModel.find({
      type: "depositMoney",
      depositTo: userID,
    })
      .sort({ createAt: -1 })
      .exec();
    console.log(`historys amount : ${historys.length}`);
    return historys;
  }
}
// withdraw
async function getWithdrawHistory(userID) {
  if (connected === undefined) {
    await new Promise((r) => setTimeout(r, 3000));
  }
  if (!connected) {
    console.log("Mongoose could not connected to database");
    return [];
  } else {
    const historys = await HistoryModel.find({
      type: "withdrawMoney",
      withdrawFrom: userID,
    })
      .sort({ createAt: -1 })
      .exec();
    console.log(`historys amount : ${historys.length}`);
    return historys;
  }
}

module.exports = {
    createHistory,
    getTransferHistory,
    getExchangeHistory,
    getDepositHistory,
    getWithdrawHistory
};
