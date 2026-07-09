const express = require('express');
// const authMiddleware = require('../../middlewares/auth.middleware');
// const validate = require('../../middlewares/validate.middleware');
const { validate, auth } = require('@/middlewares');
const transactionController = require('./transaction.controller');
const { createTransactionSchema, getTransactionsSchema } = require('./transaction.validation');

const router = express.Router();

router
  .route('/')
  .get(auth, validate(getTransactionsSchema), transactionController.getTransactions)
  .post(auth, validate(createTransactionSchema), transactionController.createTransaction);

module.exports = router;
