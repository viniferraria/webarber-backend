const request = require("supertest");
const app = require("../../src/app");
let { StatusAgendamentoTeste, UsuarioTeste } = require("../cases");

module.exports = () => {
    test("Deve buscar os status de agendamento", async () => {
        const response = await request(app)
        .get("/statusagendamento")

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
        expect(response.body[0].nome).toBe(StatusAgendamentoTeste.nome);
    });
};