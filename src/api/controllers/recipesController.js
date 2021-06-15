const recipesService = require('../services/recipesService');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const CREATED_STATUS = 201;
const OK_STATUS = 200;
const NO_CONTENT_STATUS = 204;

const createRecipe = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  });
  const { name, ingredients, preparation } = req.body;
  const { error } = schema.validate({ name, ingredients, preparation });
  if(error) return next(error);
  const user = req.user;
  const newRecipe = await recipesService
    .createRecipe({ name, ingredients, preparation, userId: user['_id'] });
  res.status(CREATED_STATUS).json({ recipe: newRecipe });
  return next();
};

const getAllRecipes = async (req, res, next) => {
  const recipes = await recipesService.getAllRecipes();
  res.status(OK_STATUS).json(recipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesService.getRecipeById(id);
  if (recipe.error) return next(recipe);
  res.status(OK_STATUS).json(recipe);
  return next();
};

const editRecipe = async (req, res, next) => {
  const recipeInfo = req.body;
  const { id } = req.params;
  const user = req.user;
  const userId = user['_id'];
  const result = await recipesService.editRecipe(id, recipeInfo, userId);
  res.status(OK_STATUS).json(result);
  next();
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  const deleted = await recipesService.deleteRecipe(id);
  if (!deleted) next({
    error: 401,
    message: 'recipe not found',
  });
  res.status(NO_CONTENT_STATUS).send();
  next();
};

const addRecipeImage = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  const recipe = await recipesService.getRecipeById(id);
  if (recipe.error) return next(recipe);
  recipe.userId = user['_id'];
  recipe.image = `localhost:3000/src/uploads/${id}.jpeg`;
  res.status(OK_STATUS).json(recipe);
  next();
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addRecipeImage,
};