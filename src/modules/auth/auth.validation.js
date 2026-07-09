const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const changePasswordSchema = z
  .object({
    body: z.object({
      oldPassword: z.string().min(1),
      newPassword: z.string().min(6),
      confirmPassword: z.string().min(1),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
  })
  .refine(({ body }) => body.newPassword === body.confirmPassword, {
    path: ['body', 'confirmPassword'],
    message: 'Passwords do not match',
  });
const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
};
