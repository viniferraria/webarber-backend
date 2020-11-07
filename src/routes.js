const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController');
const TipoUsuarioController = require('./app/controllers/TipoUsuarioController');
const BarbeariaController = require('./app/controllers/BarbeariaController');
const ServicoController = require('./app/controllers/ServicoController');
const AgendamentoController = require('./app/controllers/AgendamentoController');
const StatusAgendamentoController = require('./app/controllers/StatusAgendamentoController');
const AuthMiddleware = require('./app/middleware/auth');
const eModerador = require('./app/middleware/eModerador');

/* Rotas abertas */
// Rotas Tipo
routes.get('/tipos', TipoUsuarioController.getAll)
// Rotas dos status do agendamento
routes.get('/status', StatusAgendamentoController.getAll)
// Rotas signin
routes.post('/users', UserController.create);
// Rota Login
routes.post('/login', UserController.login);
routes.get('/barbearias', BarbeariaController.get);
routes.get('/servicos/barbearia/:barbearia_id', ServicoController.getAllBarbearia);
routes.get('/servicos/:servico_id', ServicoController.get);


/* Rotas que precisam de autenticação */
// Middleware
routes.use(AuthMiddleware)
// Rotas Usuários
routes.get('/users', UserController.getAll);
routes.get('/users/', UserController.get);
routes.patch('/users/', UserController.update);
routes.delete('/users/', UserController.delete);

// Rotas Status de agendamentos
routes.get('/status', StatusAgendamentoController.getAll)
routes.get('/agendamentos', AgendamentoController.getMyAgendamentos);
routes.post('/agendamentos', AgendamentoController.create);
routes.delete('/agendamentos', AgendamentoController.cancel);


/* Rotas do moderador */

routes.use(eModerador);
// Rotas de barbearia
routes.get('/barbearias/moderador/', BarbeariaController.getMyBarbearias);
routes.post('/barbearias', BarbeariaController.create);
routes.patch('/barbearias/', BarbeariaController.update);
routes.delete('/barbearias/', BarbeariaController.delete);

// Rotas serviço
routes.post('/servicos', ServicoController.create);
routes.patch('/servicos/:servico_id', ServicoController.update);
routes.delete('/servicos/:servico_id', ServicoController.delete);

// Rotas Agendamento
routes.get('/agendamentos/barbearia/:barbearia_id', AgendamentoController.getAgendamentosBarbearia);
routes.patch('/agendamentos', AgendamentoController.update);

module.exports = routes;