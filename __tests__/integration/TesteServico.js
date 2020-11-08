const request = require("supertest");
const app = require("../../src/app");
let { ServicoTeste, ModeradorTeste } = require("../cases");


module.exports = () => {
    test('Deve criar um serviço', async () =>{
        const response = await request(app)
        .post('/servicos')
        .set('Authorization', `Bearer ${ModeradorTeste.jwt}`)
        .send(ServicoTeste);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        ServicoTeste.id = response.body.id;
        expect(response.body.titulo).toBe(ServicoTeste.titulo);
        expect(response.body.preco).toBe(ServicoTeste.preco);
        expect(response.body.descricao).toBe(ServicoTeste.descricao);
        expect(response.body.barbearia_id).toBe(ServicoTeste.barbearia_id);
        expect(response.body.ativo).toBe(true);
    });

    test('Não deve criar um serviço para uma barbearia inválida', async () =>{
        const response = await request(app)
        .post('/servicos')
        .set('Authorization', `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...ServicoTeste, barbearia_id: 123123});

        expect(response.status).toBe(400);
    });

    test("Deve resgatar o serviço com este id", async () => {
        const response = await request(app)
        .get(`/servicos/${ServicoTeste.id}`)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.titulo).toBe(ServicoTeste.titulo);
        expect(response.body.descricao).toBe(ServicoTeste.descricao);
        expect(response.body.preco).toBe(ServicoTeste.preco);
        expect(response.body.barbearia_id).toBe(ServicoTeste.barbearia_id);
        expect(response.body.ativo).toBe(true);
    });

    test("Não deve permitir um serviço com o mesmo nome na mesma barbearia", async () => {
        const response = await request(app)
        .post('/servicos')
        .set('Authorization', `Bearer ${ModeradorTeste.jwt}`)
        .send(ServicoTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Já existe um serviço com este nome para esta barbearia');
    });

    test("Deve atualizar um serviço", async () => {
        ServicoTeste.titulo = "Serviço atualizado";
        ServicoTeste.descricao = "Descrição atualizado";
        ServicoTeste.preco = 1.99;
        const response = await request(app)
        .patch(`/servicos/${ServicoTeste.id}`)
        .set('Authorization', `Bearer ${ModeradorTeste.jwt}`)
        .send(ServicoTeste)

        expect(response.status).toBe(200)
        expect(response.body.titulo).toBe('Serviço atualizado');
        expect(response.body.descricao).toBe(ServicoTeste.descricao);
        expect(response.body.preco).toBe(1.99);
    });

    test("Não deve atualizar serviço inválido", async () => {
        const response = await request(app)
        .patch("/servicos/9999")
        .set('Authorization', `Bearer ${ModeradorTeste.jwt}`)
        .send(ServicoTeste)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Serviço não encontrado');
    });

    test("Deve deletar um serviço", async () => {
        const response = await request(app)
        .delete(`/servicos/${ServicoTeste.id}`)
        .set('Authorization', `Bearer ${ModeradorTeste.jwt}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Serviço deletado');
    });

    test("Não deve deletar um serviço inválido", async () => {
        const response = await request(app)
        .delete("/servicos/9999")
        .set('Authorization', `Bearer ${ModeradorTeste.jwt}`)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Serviço não encontrado');
    });
}