const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const transactionController = require('./transaction.controller');
const { createTransactionSchema } = require('./transaction.validation');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware, transactionController.getTransactions)
  .post(
    authMiddleware,
    validate(createTransactionSchema),
    transactionController.createTransaction
  );

module.exports = router;
