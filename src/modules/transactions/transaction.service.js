const Transaction = require('./transaction.model');

const createTransaction = async (userId, data) => {
  return Transaction.create({
    ...data,
    user: userId,
  });
};

const getTransactions = async (userId) => {
  return Transaction.find({ user: userId }).sort({ transactionDate: -1 });
};

module.exports = {
  createTransaction,
  getTransactions,
};
