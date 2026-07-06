const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyToken } = require('../utils/jwt');
const userService = require('../modules/users/user.service');

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401);
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  const user = await userService.findUserById(payload.id);

  if (!user) {
    throw new AppError('Unauthorized', 401);
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
