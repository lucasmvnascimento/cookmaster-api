const { MongoClient } = require('mongodb');

// CONEXAO PARA TESTES LOCAIS
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// CONEXAO PARA TESTES DO EVALUATOR
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

const db = null;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => {
  return db ? Promise.resolve(db) 
    : MongoClient.connect(MONGO_DB_URL, mongoOptions)
      .then((conn) => conn.db(DB_NAME))
      .catch((err) => console.error(err));
};

module.exports = connection;