const express = require("express");
const routes = express.Router();

const UsuarioController = require("./app/controllers/UsuarioController");
const TipoUsuarioController = require("./app/controllers/TipoUsuarioController");
const BarbeariaController = require("./app/controllers/BarbeariaController");
const ServicoController = require("./app/controllers/ServicoController");
const AgendamentoController = require("./app/controllers/AgendamentoController");
const StatusAgendamentoController = require("./app/controllers/StatusAgendamentoController");
const AvaliacaoController = require("./app/controllers/AvaliacaoController");
const MiddlewareAutenticacao = require("./app/middleware/auth");
const permitirTipoUsuario = require("./app/middleware/permitirTipoUsuario");

/* ROTAS ABERTAS */
// Rotas Tipo
routes.get("/tiposconta/", TipoUsuarioController.obterTiposUsuario);
// Rotas dos status do agendamento
routes.get("/statusagendamento/", StatusAgendamentoController.obterStatusAgendamento);
// Rotas signin
routes.post("/cadastro/", UsuarioController.cadastrarUsuario);
// Rota Login
routes.post("/login/", UsuarioController.login);
// Rota obter barbearias e servicos
routes.get("/barbearias/", BarbeariaController.obterBarbearias);
routes.get("/barbearias/:barbearia_id/", BarbeariaController.obterBarbeariaPorId);
routes.get("/servicos/barbearia/:barbearia_id/", ServicoController.obterServicosBarbearia);
routes.get("/servicos/:servico_id/", ServicoController.obterServicoPorId);
routes.get("/avaliacoes/:barbearia_id/", AvaliacaoController.obterAvaliacoesBarbearia);


/* ROTAS QUE PRECISAM DE AUTENTICAÇÃO */
// Rotas Usuários
routes.get("/usuarios/", MiddlewareAutenticacao, UsuarioController.obterTodosUsuarios);
routes.get("/conta/", MiddlewareAutenticacao, UsuarioController.obterUsuario);
routes.patch("/conta/", MiddlewareAutenticacao, UsuarioController.atualizarUsuario);
routes.delete("/conta/", MiddlewareAutenticacao, UsuarioController.desativarUsuario);

// Rotas Status de agendamentos
routes.get("/agendamentos/", MiddlewareAutenticacao, permitirTipoUsuario(1), AgendamentoController.obterAgendamentosUsuario);
routes.post("/agendamentos/", MiddlewareAutenticacao, permitirTipoUsuario(1), AgendamentoController.criarAgendamento);
routes.delete("/agendamentos/", MiddlewareAutenticacao, permitirTipoUsuario(1), AgendamentoController.cancelarAgendamento);

// Rotas de avaliação
routes.post("/avaliacoes/", MiddlewareAutenticacao, permitirTipoUsuario(1), AvaliacaoController.criarAvaliacao);
routes.delete("/avaliacoes/:avaliacao_id", MiddlewareAutenticacao, permitirTipoUsuario(1), AvaliacaoController.excluirAvaliacao);

/* ROTAS DO MODERADOR */
// Rotas de barbearia
routes.get("/barbearia/", MiddlewareAutenticacao, permitirTipoUsuario(2), BarbeariaController.obterBarbeariaModerador);
routes.post("/barbearias/", MiddlewareAutenticacao, permitirTipoUsuario(2), BarbeariaController.cadastrarBarbearia);
routes.patch("/barbearias/", MiddlewareAutenticacao, permitirTipoUsuario(2), BarbeariaController.atualizarBarbearia);
routes.delete("/barbearias/", MiddlewareAutenticacao, permitirTipoUsuario(2), BarbeariaController.desativarBarbearia);

// Rotas serviço
routes.post("/servicos/", MiddlewareAutenticacao, permitirTipoUsuario(2), ServicoController.criarServico);
routes.patch("/servicos/:servico_id/", MiddlewareAutenticacao, permitirTipoUsuario(2), ServicoController.atualizarServico);
routes.delete("/servicos/:servico_id/", MiddlewareAutenticacao, permitirTipoUsuario(2), ServicoController.excluirServico);

// Rotas Agendamento
routes.get("/agendamentos/barbearia/", MiddlewareAutenticacao, permitirTipoUsuario(2), AgendamentoController.obterAgendamentosBarbearia);
routes.patch("/agendamentos/", MiddlewareAutenticacao, permitirTipoUsuario(2), AgendamentoController.atualizarStatusAgendamento);

module.exports = routes;