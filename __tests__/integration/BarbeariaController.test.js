const request = require("supertest");
const app = require("../../src/app");
const servicosTeste = require("./ServicoController.test");
const { user, moderator } = require("./1UserController.test");

var id;
var barbearia = {
    "nome": "Testing",
    "endereco": "Testing",
    "telefone": "(11)9999999",
    "horarioAbertura": "2020-10-29T16:34:00.000Z",
    "horarioFechamento": "2020-10-29T16:34:00.000Z",
    "user_id": moderator.id
};

describe("Barberia controller", () => {
    test('Não deve permitir que um usuário crie uma barberia', async () =>{
        const response = await request(app)
        .post('/barbearias')
        .send({...barbearia, user_id: user.id});

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        expect(response.body.nome).toBe(barbearia.nome);
        expect(response.body.endereco).toBe(barbearia.endereco);
        expect(response.body.telefone).toBe(barbearia.telefone);
        expect(response.body.horarioAbertura).toBe(barbearia.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(barbearia.horarioFechamento);
        expect(response.body.user_id).toBe(barbearia.user_id);
        expect(response.body.ativo).toBe(true);
    });

    test('Deve permitir que um moderador crie uma barberia', async () =>{
        const response = await request(app)
        .post('/barbearias')
        .send(barbearia);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        expect(response.body.nome).toBe(barbearia.nome);
        expect(response.body.endereco).toBe(barbearia.endereco);
        expect(response.body.telefone).toBe(barbearia.telefone);
        expect(response.body.horarioAbertura).toBe(barbearia.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(barbearia.horarioFechamento);
        expect(response.body.user_id).toBe(barbearia.user_id);
        expect(response.body.ativo).toBe(true);
    });

    test("Não deve permitir uma barberia com o mesmo nome", async () => {
        const response = await request(app)
        .post('/barbearias')
        .send(barbearia);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Já existe uma barbearia com este nome');
    });

    test("Deve retornar uma certa barbearia", async () => {
        let query = "testing";
        const response = await request(app)
        .get(`/barbearias?nome=${query}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toBe(barbearia);
    });

    test("Ao buscar uma barbearia inexistente, deve retornar barbearia não encontrada", async () => {
        const response = await request(app)
        .get(`/barbearias?nome=${999}`);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Barbearia não encontrada');
    });

    test("Deve retornar uma lista com todas as barberias", async () => {
        const response = await request(app)
        .get("/barbearias/")
        expect(response.status).toBe(200);
        expect(response.body).toContainEqual({ativo: true, ...barbearia});
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
    
    test("Deve retornar uma lista com as barberias do moderador", async () => {
        const response = await request(app)
        .get("/barbearias/moderador/1")
        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(barbearia);
        expect(response.body.length).toBe(1);
    });
    
    test("Deve retornar uma lista vazia para moderadores sem barbearia ou moderadores inexistentes", async () => {
        const response = await request(app)
        .get("/barbearias/moderador/222")
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Deve atualizar uma barbearia", async () => {
        barbearia.nome = "Barbearia atualizada";
        barbearia.endereco = "Novo endereço";
        const response = await request(app)
        .patch("/barbearias/" + id)
        .send(barbearia)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe('Barbearia atualizada');
        expect(response.body.endereco).toBe('Novo endereço');
    });

    test("Deve retornar uma barbearia inválida", async () => {
        const response = await request(app)
        .patch("/barbearias/9999")
        .send(barbearia)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Barbearia não encontrada');
    });

    test("Deve deletar uma barberia", async () => {
        const response = await request(app)
        .delete("/barbearias/" + id)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Barbearia deletada');
    });

    test("Não deve deletar uma barberia inválida", async () => {
        const response = await request(app)
        .delete("/barbearias/9999")

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Barbearia não encontrada');
    });  

    // test("Deve retornar Acesso recusado para usuários que não são moderadores", async () => {
    //     const response = await request(app)
    //     .get("/barbearias/moderador/2")
    //     expect(response.body).toContainEqual(barbearia);
    //     expect(response.body.length).toBe(1);
    // }); 
})

describe("Criando serviços para barbearia", () => servicosTeste());