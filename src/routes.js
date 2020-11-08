const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController');
const TipoUsuarioController = require('./app/controllers/TipoUsuarioController');
const BarbeariaController = require('./app/controllers/BarbeariaController');
const ServicoController = require('./app/controllers/ServicoController');
const AgendamentoController = require('./app/controllers/AgendamentoController');
const StatusAgendamentoController = require('./app/controllers/StatusAgendamentoController');

// Rotas Tipo
routes.get('/tipos', TipoUsuarioController.getAll)

// Rotas usuários
routes.post('/login', UserController.login);
routes.get('/users', UserController.getAll);
routes.get('/users/:user_id', UserController.get);
routes.post('/users', UserController.create);
routes.patch('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

// Rotas barbearia
routes.get('/barbearias', BarbeariaController.get);
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

// Rotas Agendamento
routes.get('/agendamentos/barbearia/:barbearia_id', AgendamentoController.getAgendamentosBarbearia);
routes.get('/agendamentos', AgendamentoController.getMyAgendamentos);
routes.post('/agendamentos', AgendamentoController.create);
routes.patch('/agendamentos', AgendamentoController.update);
routes.delete('/agendamentos', AgendamentoController.cancel);

// Rotas Status de agendamentos
routes.get('/status', StatusAgendamentoController.getAll)

module.exports = routes;