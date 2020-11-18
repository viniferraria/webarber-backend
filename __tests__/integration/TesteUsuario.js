const request = require("supertest");
const app = require("../../src/app");
let { UsuarioTeste, ModeradorTeste } = require("../cases");

module.exports = () => {
    test("Deve criar uma conta", async () => {
        const response = await request(app)
        .post("/cadastro")
        .send(UsuarioTeste);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe(UsuarioTeste.nome);
        expect(response.body.sobrenome).toBe(UsuarioTeste.sobrenome);
        expect(response.body.email).toBe(UsuarioTeste.email);
        expect(response.body.password).toBe(UsuarioTeste.password);
        expect(response.body.ativo).toBe(true);
        expect(response.body.CPF).toBe(UsuarioTeste.CPF || null);
        expect(response.body.CNPJ).toBe(UsuarioTeste.CNPJ || null);
        expect(response.body.idTipo).toBe(UsuarioTeste.idTipo);
    });

    test("Deve criar uma conta de moderador", async () => {
        const response = await request(app)
        .post("/cadastro")
        .send(ModeradorTeste);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
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
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("sessionToken");
        UsuarioTeste.jwt = response.body.sessionToken;
    });

    test("Deve autenticar um moderador", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: ModeradorTeste.email, password: ModeradorTeste.password })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("sessionToken");
        ModeradorTeste.jwt = response.body.sessionToken;
    });

    test("Não deve autenticar um usuário com senha inválida", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: UsuarioTeste.email, password: "lalala" })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Credenciais inválidas");
    });
    
    test("Não deve autenticar um usuário inexistente", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: "fake@mail.com", password: "lalala" });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Usuário não cadastrado");
    });
    
    test("Não deve permitir cadastros com  CPF/CNPJ/Email repetidos", async () => {
        const response = await request(app)
        .post("/cadastro")
        .send(UsuarioTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Erro ao criar uma conta");
    });

    test("Deve atualizar as informações de um usuário", async () => {
        UsuarioTeste.nome = "updatedName";
        UsuarioTeste.sobrenome = "updatedLastName";
        const response = await request(app)
        .patch("/conta")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(UsuarioTeste)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe("updatedName");
        expect(response.body.sobrenome).toBe("updatedLastName");
    });

    // test("Não deve atualizar as informações um usuário inexistente", async () => {
    //     const response = await request(app)
    //     .patch("/users/9999")
    //     .send(UsuarioTeste)

    //     expect(response.status).toBe(404);
    //     expect(response.body.message).toBe("Usuário não encontrado");
    // });

    test("Deve excluir o próprio usuário", async () => {
        const response = await request(app)
        .delete("/conta")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Conta desativada");
    });

    test("Não deve autenticar um usuário com conta inativa", async () => {
        const response = await request(app)
        .post("/login")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send({ email: UsuarioTeste.email, password: UsuarioTeste.password })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Credenciais inválidas");
    });
}
