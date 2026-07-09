const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.validated.body);
  const token = `Bearer ${result.token}`;
  sendSuccess(res, 201, token, 'Register successfully');
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validated.body);
  const token = `Bearer ${result.token}`;
  sendSuccess(res, 200, token, 'Login successfully');
});

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user, req.body);
  sendSuccess(res, 200, 'Change password successfully');
});

const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  sendSuccess(res, 200, null, 'Send email to reset password successfully');
});

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
};
