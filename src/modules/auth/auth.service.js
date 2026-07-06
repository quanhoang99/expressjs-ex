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

module.exports = {
  register,
  login,
};
