const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyToken } = require('../utils/jwt');
const userService = require('../modules/users/user.service');

const isTokenObsolete = (userUpdatedAt, tokenIssuedAt) => {
  const userUpdatedTime = userUpdatedAt.getTime();
  return userUpdatedTime !== tokenIssuedAt;
};
const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401);
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  console.log('🚀 ~ payload:', payload);

  const user = await userService.findUserById(payload.id);
  console.log('🚀 ~ user:', user);
  if (!user) {
    throw new AppError('Unauthorized', 401);
  }
  if (isTokenObsolete(user.updatedAt, payload.iat)) {
    throw new AppError('Token has expired due to password change. Please login again.', 401);
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
