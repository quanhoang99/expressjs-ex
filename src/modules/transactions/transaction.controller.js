const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const transactionService = require('./transaction.service');

const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.createTransaction(
    req.user.id,
    req.validated.body
  );

  sendSuccess(res, 201, transaction, 'Transaction created successfully');
});

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await transactionService.getTransactions(req.user.id);
  sendSuccess(res, 200, transactions);
});

module.exports = {
  createTransaction,
  getTransactions,
};
