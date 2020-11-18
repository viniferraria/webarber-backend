const request = require("supertest");
const moment = require("moment");
const app = require("../../src/app");
let { AgendamentoTeste, AgendamentoTesteFalha, ModeradorTeste, UsuarioTeste, BarbeariaTeste } = require("../cases");

module.exports = () => {
    test("Deve criar um agendamento", async () => {
        const response = await request(app)
        .post("/agendamentos")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(AgendamentoTeste);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.idBarbearia).toBe(AgendamentoTeste.idBarbearia);
        expect(response.body.idServico).toBe(AgendamentoTeste.idServico);
        // TODO: Testar data convertendo para string
    });

    test('Não deve criar um agendamento para o mesmo horário', async () =>{
        const response = await request(app)
        .post('/agendamentos')
        .set('Authorization', `Bearer ${UsuarioTeste.jwt}`)
        .send(AgendamentoTeste);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Não é possível criar um agendamento, o horário informado já está ocupado');
    });

    test('Não deve criar um agendamento ao enviar a data no formato inválido', async () =>{
        const response = await request(app)
        .post('/agendamentos')
        .set('Authorization', `Bearer ${UsuarioTeste.jwt}`)
        .send({ ...AgendamentoTeste, data: new Date().toUTCString()});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('É necessário informar uma data válida no formato ISO para criar um agendamento');
    });

    test('Deve criar mais de um agendamento para o mesmo usuário com horário diferente', async () =>{
        const response = await request(app)
        .post("/agendamentos")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send({ ...AgendamentoTeste, data: moment().subtract(1, "days") });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.idBarbearia).toBe(AgendamentoTeste.idBarbearia);
        expect(response.body.idServico).toBe(AgendamentoTeste.idServico);
    });

    test("Deve retornar falha na falta de dados para criar um agendamento", async () => {
        const response = await request(app)
        .post("/agendamentos")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(AgendamentoTesteFalha);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Falta dados para completar a ação");
    });

    test('Não deve criar um agendamento para um serviço inexistente', async () =>{
        const response = await request(app)
        .post('/agendamentos')
        .set('Authorization', `Bearer ${UsuarioTeste.jwt}`)
        .send({ ...AgendamentoTeste, idServico: 9929213 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Não é possível criar um agendamento para um serviço inexistente');
    });

    test('Não deve criar um agendamento para uma barbearia inexistente', async () =>{
        const response = await request(app)
        .post('/agendamentos')
        .set('Authorization', `Bearer ${UsuarioTeste.jwt}`)
        .send({ ...AgendamentoTeste, idBarbearia: 9929213});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Não é possível criar um agendamento para uma barbearia inexistente');
    });

    test("Deve cancelar um agendamento que seja deste usuário", async () => {
        const response = await request(app)
        .delete("/agendamentos")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(AgendamentoTeste);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Agendamento cancelado");
    });

    test('Deve retornar falha ao atualizar um agendamento se não for moderador', async () =>{
        const response = await request(app)
        .patch("/agendamentos")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send({ ...AgendamentoTeste,  idStatus: 2 });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Rota restrita à moderadores");
    });

    test("Deve retornar falha ao atualizar um agendamento inexistente", async () => {
        const response = await request(app)
        .patch("/agendamentos")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...AgendamentoTeste, idStatus: 2, id: 99 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Não existe este agendamento");
    });

    test("Deve retornar falha ao atualizar um agendamento que não possui este tipo de status do agendamento", async () => {
        const response = await request(app)
        .patch("/agendamentos")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...AgendamentoTeste, idStatus: 99 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Não existe este status");
    });

    test("Deve atualizar um agendamento", async () => {
        const response = await request(app)
        .patch("/agendamentos")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...AgendamentoTeste, idStatus: 3 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Agendamento atualizado");
    });

    test("Deve resgatar todos os agendamentos do usuário", async () => {
        const response = await request(app)
        .get("/agendamentos")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
        expect(response.body[0].idBarbearia).toBe(AgendamentoTeste.idBarbearia);
        expect(response.body[0].idServico).toBe(AgendamentoTeste.idServico);
    });

    test("Deve resgatar todos os agendamentos da barbearia", async () => {
        const response = await request(app)
        .get(`/agendamentos/barbearia/${BarbeariaTeste.id}`)
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
        expect(response.body[0].idBarbearia).toBe(AgendamentoTeste.idBarbearia);
        expect(response.body[0].idServico).toBe(AgendamentoTeste.idServico);
    });
};