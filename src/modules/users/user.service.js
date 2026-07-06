const User = require('./user.model');
const AppError = require('../../utils/AppError');

const createUser = async (data) => {
  return User.create(data);
};

const findUserByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email });
  return includePassword ? query.select('+password') : query;
};

const findUserById = async (id) => {
  return User.findById(id);
};

const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getCurrentUser,
};
