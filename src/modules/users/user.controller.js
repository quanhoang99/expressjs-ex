const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const userService = require('./user.service');

const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getCurrentUser(req.user.id);
  sendSuccess(res, 200, user);
});

module.exports = {
  getMe,
};
