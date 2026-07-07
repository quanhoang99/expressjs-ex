const express = require('express');
const { validate } = require('@/middlewares');
const authController = require('@/modules/auth/auth.controller');
const { registerSchema, loginSchema } = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
