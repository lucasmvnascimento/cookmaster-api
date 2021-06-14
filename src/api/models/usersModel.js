const connection = require('./connection');

const createUser = async ({ name, email, password }) => {
  const db = await connection();
  const { insertedId } = await db
    .collection('users').insertOne({ name, email, password, role: 'user' });
  return {
    _id: insertedId,
    name,
    email,
    password,
    role: 'user',
  };
};

const findByEmail = async (email) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  return user;
};


module.exports = {
  createUser,
  findByEmail
};