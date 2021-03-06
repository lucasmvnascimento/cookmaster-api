const express = require('express');
const bodyParser = require('body-parser');
const Middlewares = require('./middlewares');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const secret = 'trybe';

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const token = req.headers['authorization'];
    if (!token) callback({ error: 401, message: 'missing auth token' });
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded.data;
      callback(null, 'src/uploads');
    } catch (err) {
      callback({ error: 401, message: err.message }); 
    }
  },
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

app.post('/recipes', Middlewares.validateJWT ,recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', Middlewares.validateJWT,recipesController.editRecipe);
app.delete('/recipes/:id', Middlewares.validateJWT,recipesController.deleteRecipe);

app.put('/recipes/:id/image',upload.single('image'),
  recipesController.addRecipeImage);

app.use(Middlewares.error);

module.exports = app;
