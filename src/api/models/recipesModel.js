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

module.exports = {
  createRecipe,
  getAllRecipes,
};