const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const transactionService = require('./transaction.service');

const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.user.id, req.validated.body);

  sendSuccess(res, 201, transaction, 'Transaction created successfully');
});

const getTransactions = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10 } = req.validated.query;
  const [transactions, totalItems] = await Promise.all([
    transactionService.getTransactions(req.user.id, req.validated.query),
    transactionService.getTransactionsCount(req.user.id),
  ]);
  const result = {
    items: transactions,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
      pageSize,
    },
  };
  sendSuccess(res, 200, result);
});

module.exports = {
  createTransaction,
  getTransactions,
};
