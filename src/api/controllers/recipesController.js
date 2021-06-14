const recipesService = require('../services/recipesService');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const secret = 'trybe';

const CREATED_STATUS = 201;
const OK_STATUS = 200;

const createRecipe = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  });
  const { name, ingredients, preparation } = req.body;
  const { error } = schema.validate({ name, ingredients, preparation });
  if(error) return next(error);
  const token = req.headers['authorization'];
  if (!token) return next({
    error: 401,
    message: 'Token não encontrado'
  });
  try {
    const decoded = jwt.verify(token, secret);
    const user = decoded.data;
    const newRecipe = await recipesService
      .createRecipe({ name, ingredients, preparation, userId: user['_id'] });
    res.status(CREATED_STATUS).json({ recipe: newRecipe });
    return next();
  } catch (err) {
    return next({
      error: 401,
      message: err.message,
    });
  }
};

const getAllRecipes = async (req, res, next) => {
  const recipes = await recipesService.getAllRecipes();
  res.status(OK_STATUS).json(recipes);
};

module.exports = {
  createRecipe,
  getAllRecipes
};