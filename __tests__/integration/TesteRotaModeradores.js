const request = require("supertest");
const moment = require("moment");
const app = require("../../src/app");
let { AgendamentoTeste, AgendamentoTesteFalha, ModeradorTeste, UsuarioTeste, BarbeariaTeste } = require("../cases");

module.exports = () => {

    // test("Deve retornar falha na falta de dados para cancelar um agendamento", async () =>{
    //     const response = await request(app)
    //     .delete("/agendamentos")
    //     .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
    //     .send(AgendamentoTesteFalha);

    //     expect(response.status).toBe(400);
    //     expect(response.body.message).toBe("Falta dados para completar a ação");
    // });

    // test("Deve retornar falha ao cancelar agendamento de um usuário inexistente", async () =>{
    //     const response = await request(app)
    //     .delete("/agendamentos")
    //     .send({ ...AgendamentoTeste, idUsuario: 99 });

    //     expect(response.status).toBe(400);
    //     expect(response.body.message).toBe("Não existe este usuário");
    // });

};