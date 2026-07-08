const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.validated.body);
  sendSuccess(res, 201, result.token, 'Register successfully');
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validated.body);
  const token = `Bearer ${result.token}`;
  sendSuccess(res, 200, token, 'Login successfully');
});

const changePassword = asyncHandler(async (req, res) => {
  console.log('🚀 ~ req:', req);
  const result = await authService.changePassword(req.user, req.body);
  const token = `Bearer ${result.token}`;
  sendSuccess(res, 200, token, 'Change password successfully');
});

module.exports = {
  register,
  login,
  changePassword,
};
