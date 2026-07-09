const Transaction = require('./transaction.model');

const createTransaction = async (userId, data) => {
  return Transaction.create({
    ...data,
    user: userId,
  });
};

const getTransactions = async (userId, query) => {
  const { page = 1, pageSize = 10 } = query;
  const skip = (page - 1) * pageSize;
  return Transaction.find({ user: userId }).skip(skip).limit(pageSize).sort({ createdAt: -1 });
};
const getTransactionsCount = async (userId) => {
  return Transaction.countDocuments({ user: userId });
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionsCount,
};
