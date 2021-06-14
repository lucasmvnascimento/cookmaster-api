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

const getRecipeById = async (id) => {
  if (!id) return {
    error: 404,
    message: 'recipe not found',
  };
  try {
    const recipe = await recipesModel.getRecipeById(id);
    if (!recipe) return {
      error: 404,
      message: 'recipe not found',
    };
    return recipe;
  } catch (err) {
    return {
      error: 404,
      message: 'recipe not found'
    };
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};