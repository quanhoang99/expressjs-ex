const bcrypt = require('bcrypt');
const AppError = require('../../utils/AppError');
const { signToken } = require('../../utils/jwt');
const userService = require('../users/user.service');

const register = async ({ name, email, password }) => {
  const existingUser = await userService.findUserByEmail(email);

  if (existingUser) {
    throw new AppError('Email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userService.createUser({
    name,
    email,
    password: hashedPassword,
  });
  const token = signToken({ id: user.id });
  user.password = undefined;

  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await userService.findUserByEmail(email, true);

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken({ id: user.id });
  user.password = undefined;

  return { user, token };
};
const changePassword = async (user, { oldPassword, newPassword }) => {
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid password', 400);
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await userService.updateUser(user.id, {
    password: hashedPassword,
  });
  const token = signToken({ id: updatedUser.id });
  updatedUser.password = undefined;

  return { user: updatedUser, token };
};
const forgotPassword = async (email) => {
  const DEFAULT_PASSWORD = '123456';
  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  const updatedUser = await userService.updateUser(user.id, { password: hashedPassword });

  const resetToken = signToken({ id: updatedUser.id });
  return { user: updatedUser, resetToken };
};

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
};
