const express = require('express');
const bodyParser = require('body-parser');
const Middlewares = require('./middlewares');

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);

app.post('/login', usersController.login);

app.post('/recipes', recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);

app.use(Middlewares.error);

module.exports = app;
