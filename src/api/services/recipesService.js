const recipesModel = require('../models/recipesModel');

const ZERO = 0;

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

const editRecipe = async (id, recipeInfo, userId) => {
  const newRecipe = await recipesModel.editRecipe(id, recipeInfo, userId);
  return newRecipe;
};

const deleteRecipe = async (id) => {
  const result = await recipesModel.deleteRecipe(id);
  if(result.deletedCount == ZERO) return false;
  return true;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};