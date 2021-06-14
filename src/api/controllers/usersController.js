const usersService = require('../services/usersService');
const Joi = require('joi');

const CREATED_STATUS = 201;
const OK_STATUS = 200;


const createUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    //Consulta à documentação do Joi - https://joi.dev/api/?v=17.4.0
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required(),
  });
  const { name, email, password } = req.body;
  const { error } = schema.validate({ name, email, password });
  if(error) return next(error);
  const newUser = await usersService.createUser({ name, email, password });
  if (newUser.error) return next(newUser);
  res.status(CREATED_STATUS).json({ user: newUser });
  next();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const validateLogin = await usersService.login({ email, password });
  if(validateLogin.error) return next(validateLogin);
  res.status(OK_STATUS).json(validateLogin);
  next();
};

module.exports = {
  createUser,
  login,
};