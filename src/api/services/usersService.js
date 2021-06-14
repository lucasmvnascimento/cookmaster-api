const usersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const secret = 'trybe';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createUser = async ({ name, password, email }) => {
  const emailValidation = await usersModel.findByEmail(email);
  if(emailValidation) return {
    error: 409,
    message: 'Email already registered',
  };
  const newUser = await usersModel.createUser({ name, password, email });
  return newUser;
};

const validateLogin = ({ email, password }) => {
  if (!email || !password) return {
    error: 401,
    message: 'All fields must be filled'
  };
  const regex = /[a-zA-Z|]{1,15}@[a-z]{1,15}.[a-z]{3}/gm;
  if (!email.match(regex)) return {
    error: 401,
    message: 'Incorrect username or password',
  };
  return null;
};

const login = async ({ email, password }) => {
  const validation = validateLogin({ email, password });
  if (validation) return validation;
  const user = await usersModel.findByEmail(email);
  if(!user || (user.password !== password)) return {
    error: 401,
    message: 'Incorrect username or password'
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return {
    token
  };
};

module.exports = {
  createUser,
  login,
};