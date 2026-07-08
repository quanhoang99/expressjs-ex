const User = require('./user.model');
const AppError = require('../../utils/AppError');

const createUser = async (data) => {
  return User.create(data);
};

const findUserByEmail = async (email, includePassword = false) => {
  console.log('🚀 ~ findUserByEmail ~ email:', email);
  const query = User.findOne({ email });
  return includePassword ? query.select('+password') : query;
};

const findUserById = async (id) => {
  return User.findById(id).select('+password');
};

const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};
const updateUser = async (userId, data) => {
  return User.findByIdAndUpdate(userId, data, { new: true });
};
module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getCurrentUser,
  updateUser,
};
