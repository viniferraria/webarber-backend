const TesteUsuario = require("./TesteUsuario");
const TesteBarbearia = require("./TesteBarbearia");
const TesteServico = require("./TesteServico");

describe('Deve testar o fluxo da aplicação', () => {

    describe('Deve testar o fluxo de criação do usuário e login', TesteUsuario);
    describe('Deve testar o fluxo de manutenção de uma barbearia', TesteBarbearia);
    describe('Deve testar o fluxo de manutenção de servicos', TesteServico);

});

