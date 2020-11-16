let UsuarioTeste = {
    "nome": "Testing",
    "sobrenome": "123",
    "email": "testing123@gmail.com",
    "password": "asdasdasd",
    "CPF": "999.999.999-21",
    "idTipo": 1,
    "jwt": null 
};

let ModeradorTeste = {
    "nome": "4queijos",
    "sobrenome": "123",
    "email": "4queijos@gmail.com",
    "password": "asdasdasd",
    "CNPJ": "999.123.999-11",
    "idTipo": 2,
    "jwt": null
};

var BarbeariaTeste = {
    "id": 1,
    "nome": "Testing",
    "endereco": "Testing",
    "telefone": "(11)9999999",
    "horarioAbertura": "2020-10-29T16:34:00.000Z",
    "horarioFechamento": "2020-10-29T16:34:00.000Z",
    "complemento": "Testing",
    "numero": 123,
    "bloco": "Testing",
    "cep": "Testing"
};



let ServicoTeste = {
    "id": 1,
    "titulo": "Testing",
    "descricao": "descricao",  
    "preco": 9.99,
    "barbearia_id": BarbeariaTeste.id
};

var StatusAgendamentoTeste = {
    "nome": "Agendado"
};

var AgendamentoTeste = {
    "id": 1,
    "idBarbearia": BarbeariaTeste.id,
    "idServico": ServicoTeste.id,
    "data": new Date()
};

var AgendamentoTesteFalha = {
    "id": 1,
    "idBarbearia": BarbeariaTeste.id,
    "data": new Date(),
};

var AvaliacaoTeste = {
    "id": 1,
    "titulo": "Um titulo",
    "descricao": "Uma descrição",
    "nota": 8,
    "idBarbearia": BarbeariaTeste.id,
    "idServico": ServicoTeste.id,
    "idAgendamento": AgendamentoTeste.id
};

module.exports = {
    UsuarioTeste,
    ModeradorTeste,
    BarbeariaTeste,
    ServicoTeste,
    StatusAgendamentoTeste,
    AgendamentoTeste,
    AgendamentoTesteFalha,
    AvaliacaoTeste
};