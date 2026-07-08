const express = require('express');
const { validate, auth } = require('@/middlewares');
const authController = require('@/modules/auth/auth.controller');
const { registerSchema, loginSchema, changePasswordSchema } = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post(
  '/change-password',
  auth,
  validate(changePasswordSchema),
  authController.changePassword,
);

module.exports = router;
