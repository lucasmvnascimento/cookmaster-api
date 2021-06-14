const recipesModel = require('../models/recipesModel');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const newRecipe = recipesModel
    .createRecipe({ name, ingredients, preparation, userId });
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};