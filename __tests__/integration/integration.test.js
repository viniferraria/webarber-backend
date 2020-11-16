const TesteUsuario = require("./TesteUsuario");
const TesteBarbearia = require("./TesteBarbearia");
const TesteServico = require("./TesteServico");
const TesteStatusAgendamento = require("./TesteStatusAgendamento");
const TesteAgendamento = require("./TesteAgendamento");
const TesteAvaliacao = require("./TesteAvaliacao");

describe('Deve testar o fluxo da aplicação', () => {

    describe('Deve testar o fluxo de criação do usuário e login', TesteUsuario);
    describe('Deve testar o fluxo de manutenção de uma barbearia', TesteBarbearia);
    describe('Deve testar o fluxo de manutenção de servicos', TesteServico);
    describe('Deve testar o fluxo de status de agendamento', TesteStatusAgendamento);
    describe('Deve testar o fluxo de agendamento', TesteAgendamento);
    describe('Deve testar o fluxo de avaliação', TesteAvaliacao);

});

