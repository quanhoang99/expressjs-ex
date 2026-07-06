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

module.exports = {
  createTransactionSchema,
};
