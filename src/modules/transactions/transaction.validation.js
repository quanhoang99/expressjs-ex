const { z } = require('zod');

const createTransactionSchema = z.object({
  body: z.object({
    type: z.enum(['income', 'expense']),
    amount: z.number().positive(),
    category: z.string().min(1),
    note: z.string().optional(),
    transactionDate: z.coerce.date().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
const getTransactionsSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
  }),
});

module.exports = {
  createTransactionSchema,
  getTransactionsSchema,
};
