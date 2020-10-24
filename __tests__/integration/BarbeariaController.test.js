const request = require("supertest");
const app = require("../../src/app");
const servicosTeste = require("./ServicoController.test");

var id;
var barberia = {
    "nome": "Testing",
    "endereco": "Testing",
    "telefone": "(11)9999999",
    "horarioAbertura": "2020-10-29T16:34:00.000Z",
    "horarioFechamento": "2020-10-29T16:34:00.000Z",
    "user_id": 1
};

describe("Barberia controller", () => {
    test('Deve criar uma barberia', async () =>{
        const response = await request(app)
        .post('/barbearias')
        .send(barberia);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        expect(response.body.nome).toBe(barberia.nome);
        expect(response.body.endereco).toBe(barberia.endereco);
        expect(response.body.telefone).toBe(barberia.telefone);
        expect(response.body.horarioAbertura).toBe(barberia.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(barberia.horarioFechamento);
        expect(response.body.user_id).toBe(barberia.user_id);
        expect(response.body.ativo).toBe(true);
    });

    test("Não deve permitir uma barberia com o mesmo nome", async () => {
        const response = await request(app)
        .post('/barbearias')
        .send(barberia);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Já existe uma barbearia com este nome');
    });

    test("Deve retornar a barbearia com id igual à 1", async () => {
        const response = await request(app)
        .get(`/barbearias/${barbearia.id}`)
        
        expect(response.status).toBe(200);
        expect(response.body).toBe(barbearia);
    });

    test("Ao buscar uma barbearia inexistente, deve retornar barbearia não encontrada", async () => {
        const response = await request(app)
        .get(`/barbearias/${999}`)
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Barbearia não encontrada');
    });

    test("Deve atualizar uma barbearia", async () => {
        barberia.nome = "Barbearia atualizada";
        barberia.endereco = "Novo endereço";
        const response = await request(app)
        .patch("/barbearias/" + id)
        .send(barberia)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe('Barbearia atualizada');
        expect(response.body.endereco).toBe('Novo endereço');
    });

    test("Deve retornar uma barbearia inválida", async () => {
        const response = await request(app)
        .patch("/barbearias/9999")
        .send(barberia)

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

    test("Deve retornar uma lista com todas as barberias", async () => {
        const response = await request(app)
        .get("/barbearias/")
        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(barbearia);
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
        expect(response.body).toBe([]);
        expect(response.body.length).toBe(0);
    });

    // test("Deve retornar uma lista com as barbearias que possuem o nome próximo ao da query ", async () => {
    //     const response = await request(app)
    //     .get("/barbearias/moderador/2")
    //     expect(response.status).toBe(200);
    //     expect(response.body).toContainEqual(barbearia);
    //     expect(response.body.length).toBe(0);
    // });

    // test("Deve retornar Acesso recusado para usuários que não são moderadores", async () => {
    //     const response = await request(app)
    //     .get("/barbearias/moderador/2")
    //     expect(response.body).toContainEqual(barbearia);
    //     expect(response.body.length).toBe(1);
    // }); 
})

describe("Criando serviços para barbearia", () => servicosTeste());