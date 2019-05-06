const express = require('express');

const routes = express.Router();

const TodoController = require('./controller/TodoController');

routes.get('/', TodoController.inicialTodo);
routes.get('/todo', TodoController.listaTodo);

module.exports = routes;