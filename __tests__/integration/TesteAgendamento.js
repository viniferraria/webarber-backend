const request = require("supertest");
const app = require("../../src/app");
let { AgendamentoTeste, AgendamentoTesteFalha, ModeradorTeste, UsuarioTeste } = require("../cases");

module.exports = () => {
    test('Deve criar um agendamento', async () =>{
        const response = await request(app)
        .post('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: UsuarioTeste.id });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.idBarbearia).toBe(AgendamentoTeste.idBarbearia);
        expect(response.body.idUsuario).toBe(UsuarioTeste.id);
        expect(response.body.idServico).toBe(AgendamentoTeste.idServico);
        // TODO: Testar data convertendo para string
    });

    test('Deve criar mais de um agendamento para o mesmo usuário', async () =>{
        const response = await request(app)
        .post('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: UsuarioTeste.id });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.idBarbearia).toBe(AgendamentoTeste.idBarbearia);
        expect(response.body.idUsuario).toBe(UsuarioTeste.id);
        expect(response.body.idServico).toBe(AgendamentoTeste.idServico);
    });

    test('Deve retornar falha na falta de dados para criar um agendamento', async () =>{
        const response = await request(app)
        .post('/agendamentos')
        .send(AgendamentoTesteFalha);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Falta dados para completar a ação');
    });

    test('Deve retornar falha na falta de dados para cancelar um agendamento', async () =>{
        const response = await request(app)
        .delete('/agendamentos')
        .send(AgendamentoTesteFalha);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Falta dados para completar a ação');
    });

    test('Deve retornar falha ao cancelar agendamento de um usuário inexistente', async () =>{
        const response = await request(app)
        .delete('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: 99 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Não existe este usuário');
    });

    test('Deve retornar falha ao cancelar agendamento que não seja deste usuário', async () =>{
        const response = await request(app)
        .delete('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: ModeradorTeste.id });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Este agendamento não pertence à este usuário');
    });

    test('Deve cancelar um agendamento que seja deste usuário', async () =>{
        const response = await request(app)
        .delete('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: UsuarioTeste.id });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Agendamento cancelado');
    });

    test('Deve retornar falha na falta de dados para atualizar um agendamento', async () =>{
        const response = await request(app)
        .patch('/agendamentos')
        .send(AgendamentoTesteFalha);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Falta dados para completar a ação');
    });

    test('Deve retornar falha ao atualizar um agendamento se não for moderador', async () =>{
        const response = await request(app)
        .patch('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: UsuarioTeste.id, idStatus: 2 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('É necessário informar um moderador para atualizar um agendamento');
    });

    test('Deve retornar falha ao atualizar um agendamento inexistente', async () =>{
        const response = await request(app)
        .patch('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: ModeradorTeste.id, idStatus: 2, id: 99 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Não existe este agendamento');
    });

    test('Deve retornar falha ao atualizar um agendamento que não possui este tipo de status do agendamento', async () =>{
        const response = await request(app)
        .patch('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: ModeradorTeste.id, idStatus: 99 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Não existe este status');
    });

    test('Deve atualizar um agendamento', async () =>{
        const response = await request(app)
        .patch('/agendamentos')
        .send({ ...AgendamentoTeste, idUsuario: ModeradorTeste.id, idStatus: 3 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Agendamento atualizado');
    });
}