const request = require("supertest");
const app = require("../../src/app");

var id;
var servico = {
    "titulo": "Testing",
    "preco": 9.99,
    "barbearia_id":1
};

module.exports = () => describe('Serviço controller', () => {

    test('Deve criar um serviço', async () =>{
        const response = await request(app)
        .post('/servicos')
        .send(servico);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        expect(response.body.titulo).toBe(servico.titulo);
        expect(response.body.preco).toBe(servico.preco);
        expect(response.body.barbearia_id).toBe(servico.barbearia_id);
        expect(response.body.ativo).toBe(true);
    });

    test("Deve resgatar o serviço com este id", async () => {
        const response = await request(app)
        .get('/servicos/'+id)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.titulo).toBe(servico.titulo);
        expect(response.body.preco).toBe(servico.preco);
        expect(response.body.barbearia_id).toBe(servico.barbearia_id);
        expect(response.body.ativo).toBe(true);
    });

    test("Não deve permitir um serviço com o mesmo nome na mesma barbearia", async () => {
        const response = await request(app)
        .post('/servicos')
        .send(servico);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Já existe um serviço com este nome para esta barbearia');
    });

    test("Deve atualizar um serviço", async () => {
        servico.titulo = "Serviço atualizado";
        servico.preco = 1.99;
        const response = await request(app)
        .patch("/servicos/" + id)
        .send(servico)

        expect(response.status).toBe(200)
        expect(response.body.titulo).toBe('Serviço atualizado');
        expect(response.body.preco).toBe(1.99);
    });

    test("Deve retornar um serviço inválido", async () => {
        const response = await request(app)
        .patch("/servicos/9999")
        .send(servico)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Serviço não encontrado');
    });

    test("Deve deletar um serviço", async () => {
        const response = await request(app)
        .delete("/servicos/" + id)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Serviço deletado');
    });

    test("Não deve deletar um serviço inválido", async () => {
        const response = await request(app)
        .delete("/servicos/9999")

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Serviço não encontrado');
    });
})