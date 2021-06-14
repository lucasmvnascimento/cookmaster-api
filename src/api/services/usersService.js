const usersModel = require('../models/usersModel');

const createUser = async ({ name, password, email }) => {
  const emailValidation = await usersModel.findByEmail(email);
  if(emailValidation) return {
    error: 409,
    message: 'Email already registered',
  };
  const newUser = await usersModel.createUser({ name, password, email });
  return newUser;
};

module.exports = {
  createUser,
};