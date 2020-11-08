const express = require('express');
const routes = express.Router();

const UsuarioController = require('./app/controllers/UsuarioController');
const TipoUsuarioController = require('./app/controllers/TipoUsuarioController');
const BarbeariaController = require('./app/controllers/BarbeariaController');
const ServicoController = require('./app/controllers/ServicoController');
const AgendamentoController = require('./app/controllers/AgendamentoController');
const StatusAgendamentoController = require('./app/controllers/StatusAgendamentoController');
const MiddlewareAutenticacao = require('./app/middleware/auth');
const eModerador = require('./app/middleware/eModerador');

/* ROTAS ABERTAS */
// Rotas Tipo
routes.get('/tiposconta/', TipoUsuarioController.obterTiposUsuario)
// Rotas dos status do agendamento
routes.get('/statusagendamento/', StatusAgendamentoController.obterStatusAgendamento)
// Rotas signin
routes.post('/cadastro/', UsuarioController.cadastrarUsuario);
// Rota Login
routes.post('/login/', UsuarioController.login);
// Rota obter barbearias e servicos
routes.get('/barbearias/', BarbeariaController.obterBarbearias);
routes.get('/barbearias/:barbearia_id/', BarbeariaController.obterBarbeariaPorId);
routes.get('/servicos/barbearia/:barbearia_id/', ServicoController.obterServicosBarbearia);
routes.get('/servicos/:servico_id/', ServicoController.obterServicoPorId);


/* ROTAS QUE PRECISAM DE AUTENTICAÇÃO */
// Middleware
routes.use(MiddlewareAutenticacao)

// Rotas Usuários
routes.get('/usuarios/', UsuarioController.obterTodosUsuarios);
routes.get('/conta/', UsuarioController.obterUsuario);
routes.patch('/conta/', UsuarioController.atualizarUsuario);
routes.delete('/conta/', UsuarioController.desativarUsuario);

// Rotas Status de agendamentos
routes.get('/agendamentos/', AgendamentoController.obterAgendamentosUsuario);
routes.post('/agendamentos/', AgendamentoController.criarAgendamento);
routes.delete('/agendamentos/', AgendamentoController.cancelarAgendamento);


/* ROTAS DO MODERADOR */

routes.use(eModerador);
// Rotas de barbearia
routes.get('/barbearia/', BarbeariaController.obterBarbeariaModerador);
routes.post('/barbearias/', BarbeariaController.cadastrarBarbearia);
routes.patch('/barbearias/', BarbeariaController.atualizarBarbearia);
routes.delete('/barbearias/', BarbeariaController.desativarBarbearia);

// Rotas serviço
routes.post('/servicos/', ServicoController.criarServico);
routes.patch('/servicos/:servico_id/', ServicoController.atualizarServico);
routes.delete('/servicos/:servico_id/', ServicoController.excluirServico);

// Rotas Agendamento
routes.get('/agendamentos/barbearia/:barbearia_id/', AgendamentoController.obterAgendamentosBarbearia);
routes.patch('/agendamentos/', AgendamentoController.atualizarStatusAgendamento);

module.exports = routes;