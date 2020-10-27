const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController');
const TipoUsuarioController = require('./app/controllers/TipoUsuarioController');
const BarbeariaController = require('./app/controllers/BarbeariaController');
const ServicoController = require('./app/controllers/ServicoController');
const AuthMiddleware = require('./app/middleware/auth');

// Rotas Tipo
routes.get('/tipos', TipoUsuarioController.getAll)

// Rotas signin
routes.post('/users', UserController.create);

// Rota Login
routes.post('/login', UserController.login);


// Rotas que precisam de autenticação
routes.use(AuthMiddleware)
routes.get('/users', UserController.getAll);
routes.get('/users/:user_id', UserController.get);
routes.patch('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

// Rotas barbearia
routes.get('/barbearias', BarbeariaController.getAll);
routes.get('/barbearias/:barbearia_nome', BarbeariaController.get);
routes.get('/barbearias/moderador/:user_id', BarbeariaController.getMyBarbearias);
routes.post('/barbearias', BarbeariaController.create);
routes.patch('/barbearias/:barbearia_id', BarbeariaController.update);
routes.delete('/barbearias/:barbearia_id', BarbeariaController.delete);

// Rotas serviço
routes.get('/servicos/barbearia/:barbearia_id', ServicoController.getAllBarbearia);
routes.get('/servicos/:servico_id', ServicoController.get);
routes.post('/servicos', ServicoController.create);
routes.patch('/servicos/:servico_id', ServicoController.update);
routes.delete('/servicos/:servico_id', ServicoController.delete);

module.exports = routes;