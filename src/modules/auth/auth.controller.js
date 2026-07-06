const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.validated.body);
  sendSuccess(res, 201, result, 'Register successfully');
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validated.body);
  sendSuccess(res, 200, result, 'Login successfully');
});

module.exports = {
  register,
  login,
};
