const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../utils/truncate");

var id;
var user = {
    "nome": "Testing",
    "sobrenome": "123",
    "email": "testing123@gmail.com",
    "password": "asdasdasd",
    "CPF": "999.999.999-21",
    "idTipo": 1,
};

describe('User controller', () => {
    // beforeEach(async() => await truncate());

    test('it should create an account', async () =>{
        const response = await request(app)
        .post('/users')
        .send(user);

        expect(response.status).toBe(200);
        // expect(response.type).toBe('Content-Type', /json/)
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        expect(response.body.nome).toBe(user.nome);
        expect(response.body.sobrenome).toBe(user.sobrenome);
        expect(response.body.email).toBe(user.email);
        expect(response.body.password).toBe(user.password);
        expect(response.body.ativo).toBe(true);
        expect(response.body.CPF).toBe(user.CPF);
        expect(response.body.CNPJ).toBe(user.CNPJ);
        expect(response.body.idTipo).toBe(user.idTipo);
    });

    test("It should not allow accounts to share the same email", async () => {
        const response = await request(app)
        .post('/users')
        .send(user);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error while creating new User')
    });

    test("It should not allow users to share the same CPF", async () => {
        user.email = "testando@teste.com"
        const response = await request(app)
        .post('/users')
        .send(user);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('CPF is already registered')
    });

    test("It should patch the user", async () => {
        user.nome = "updatedName";
        user.sobrenome = "updatedLastName";
        const response = await request(app)
        .patch("/users/" + id)
        .send(user)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe('updatedName');
        expect(response.body.sobrenome).toBe('updatedLastName');
    });

    test("It should return user invalid", async () => {
        const response = await request(app)
        .patch("/users/" + "9999")
        .send(user)

        expect(response.status).toBe(400);
        expect(response.error).toBe('User Not Found');
    });

    test("It should delete the user", async () => {
        const response = await request(app)
        .delete("/users/" + id)

        expect(response.status).toBe(200);
        expect(response.message).toBe('User deleted');
    });

    test("It should not allow to delete a deleted user", async () => {
        const response = await request(app)
        .delete("/users/" + id)

        expect(response.status).toBe(400);
        expect(response.error).toBe('User Not Found');
    });

    test("It should not patch the deleted user", async () => {
        user.nome = "deletedName";
        user.sobrenome = "deletedLastName";
        const response = await request(app)
        .patch("/users/" + id)
        .send(user)

        expect(response.status).toBe(400)
        expect(response.error).toBe('User Not Found');
    });

})
