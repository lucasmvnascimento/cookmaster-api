const { ObjectId } = require('bson');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const { insertedId } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation });
  return {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const editRecipe = async (id, recipeInfo, userId) => {
  const oldRecipeInfo = await getRecipeById(id);
  const newRecipe = {
    ... oldRecipeInfo,
    name: recipeInfo.name,
    ingredients: recipeInfo.ingredients,
    preparation: recipeInfo.preparation,
    userId,
  };
  const db = await connection();
  const result = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: newRecipe });
  return newRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe
};