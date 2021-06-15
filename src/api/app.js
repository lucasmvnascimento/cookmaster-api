const express = require('express');
const bodyParser = require('body-parser');
const Middlewares = require('./middlewares');
const multer = require('multer');
const path = require('path');

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, id + '.jpeg');
  }
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);

app.post('/login', usersController.login);

app.post('/recipes', recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', recipesController.editRecipe);
app.delete('/recipes/:id', recipesController.deleteRecipe);

app.post('/recipes/:id/image', upload.single('image'));


app.use(Middlewares.error);

module.exports = app;
