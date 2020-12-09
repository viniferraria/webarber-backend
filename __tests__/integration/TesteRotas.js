const request = require("supertest");
const moment = require("moment");
const app = require("../../src/app");
let { AgendamentoTeste, ModeradorTeste, UsuarioTeste, BarbeariaTeste } = require("../cases");

module.exports = () => {
    test("Não deve permitir que um usuário acesse uma rota que requer token", async () => {
        const response = await request(app)
        .get("/agendamentos")
        .send(AgendamentoTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Requer token para acessar rota");
    });

    test("Não deve permitir que um usuário acesse uma rota de moderador", async () => {
        const response = await request(app)
        .get("/servicos")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Rota restrita à moderadores");
    });

    test("Não deve permitir que um moderador acesse uma rota de usuário", async () => {
        const response = await request(app)
        .get("/agendamentos")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Rota restrita à usuários");
    });
};