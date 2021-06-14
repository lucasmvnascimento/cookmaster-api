const express = require('express');
const bodyParser = require('body-parser');
const Middlewares = require('./middlewares');

const usersController = require('./controllers/usersController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/users', usersController.createUser);

app.use(Middlewares.error);

module.exports = app;
