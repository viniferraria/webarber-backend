const request = require("supertest");
const app = require("../../src/app");
let { UsuarioTeste, ModeradorTeste, BarbeariaTeste } = require("../cases");

module.exports = () => {
    test('Deve criar uma conta', async () =>{
        const response = await request(app)
        .post('/users')
        .send(UsuarioTeste);

        UsuarioTeste.id = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe(UsuarioTeste.nome);
        expect(response.body.sobrenome).toBe(UsuarioTeste.sobrenome);
        expect(response.body.email).toBe(UsuarioTeste.email);
        expect(response.body.password).toBe(UsuarioTeste.password);
        expect(response.body.ativo).toBe(true);
        expect(response.body.CPF).toBe(UsuarioTeste.CPF || null);
        expect(response.body.CNPJ).toBe(UsuarioTeste.CNPJ || null);
        expect(response.body.idTipo).toBe(UsuarioTeste.idTipo);
    });

    test('Deve criar uma conta de moderador', async () =>{
        const response = await request(app)
        .post('/users')
        .send(ModeradorTeste);

        ModeradorTeste.id = response.body.id;
        BarbeariaTeste.user_id = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe(ModeradorTeste.nome);
        expect(response.body.sobrenome).toBe(ModeradorTeste.sobrenome);
        expect(response.body.email).toBe(ModeradorTeste.email);
        expect(response.body.password).toBe(ModeradorTeste.password);
        expect(response.body.ativo).toBe(true);
        expect(response.body.CPF).toBe(ModeradorTeste.CPF || null);
        expect(response.body.CNPJ).toBe(ModeradorTeste.CNPJ || null);
        expect(response.body.idTipo).toBe(ModeradorTeste.idTipo);
    });

    test("Deve autenticar um usuário", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: UsuarioTeste.email, password: UsuarioTeste.password })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id');
    });

    test("Não deve autenticar um usuário com senha inválida", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: UsuarioTeste.email, password: "lalala" })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Credenciais inválidas');
    });
    
    test("Não deve autenticar um usuário inexistente", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: "fake@mail.com", password: "lalala" })

        expect(response.status).toBe(401)
        expect(response.body.message).toBe('User not found');
    });
    
    test("Não deve permitir cadastros com  CPF/CNPJ/Email repetidos", async () => {
        const response = await request(app)
        .post('/users')
        .send(UsuarioTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Erro ao criar uma conta')
    });

    test("Deve atualizar as informações de um usuário", async () => {
        UsuarioTeste.nome = "updatedName";
        UsuarioTeste.sobrenome = "updatedLastName";
        const response = await request(app)
        .patch(`/users/${UsuarioTeste.id}`)
        .send(UsuarioTeste)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe('updatedName');
        expect(response.body.sobrenome).toBe('updatedLastName');
    });

    test("Não deve atualizar as informações um usuário inexistente", async () => {
        const response = await request(app)
        .patch("/users/9999")
        .send(UsuarioTeste)

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Usuário não encontrado');
    });

    test("Deve excluir um usuário", async () => {
        const response = await request(app)
        .delete(`/users/${UsuarioTeste.id}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted');
    });

    test("Não deve autenticar um usuário com conta inativa", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: UsuarioTeste.email, password: UsuarioTeste.password })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Credenciais inválidas');
    });
}
