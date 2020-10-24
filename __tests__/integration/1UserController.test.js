const request = require("supertest");
const app = require("../../src/app");

var id;
var user = {
    "nome": "Testing",
    "sobrenome": "123",
    "email": "testing123@gmail.com",
    "password": "asdasdasd",
    "CPF": "999.999.999-21",
    "idTipo": 1,
};

var moderator = {
    "nome": "4queijos",
    "sobrenome": "123",
    "email": "4queijos@gmail.com",
    "password": "asdasdasd",
    "CNPJ": "999.999.999-11",
    "idTipo": 2,
};

describe('User controller', () => {

    test('it should create an account', async () =>{
        const response = await request(app)
        .post('/users')
        .send(user);

        user.id = response.body.id;
        expect(response.status).toBe(201);
        // expect(response.type).toBe('Content-Type', /json/)
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe(user.nome);
        expect(response.body.sobrenome).toBe(user.sobrenome);
        expect(response.body.email).toBe(user.email);
        expect(response.body.password).toBe(user.password);
        expect(response.body.ativo).toBe(true);
        expect(response.body.CPF).toBe(user.CPF || null);
        expect(response.body.CNPJ).toBe(user.CNPJ || null);
        expect(response.body.idTipo).toBe(user.idTipo);
    });

    test('it should create an moderator account', async () =>{
        const response = await request(app)
        .post('/users')
        .send(moderator);

        moderator.id = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe(moderator.nome);
        expect(response.body.sobrenome).toBe(moderator.sobrenome);
        expect(response.body.email).toBe(moderator.email);
        expect(response.body.password).toBe(moderator.password);
        expect(response.body.ativo).toBe(true);
        expect(response.body.CPF).toBe(moderator.CPF || null);
        expect(response.body.CNPJ).toBe(moderator.CNPJ || null);
        expect(response.body.idTipo).toBe(moderator.idTipo);
    });

    test("It should authenticate user", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: user.email, password: user.password })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id');
    });

    test("It should not authenticate user with wrong password", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: user.email, password: "lalala" })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Credenciais inválidas');
    });
    
    test("It should not authenticate unregistered user", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: "fake@mail.com", password: "lalala" })

        expect(response.status).toBe(401)
        expect(response.body.message).toBe('User not found');
    });
    
    test("It should not allow accounts to share the same email or CPF/CNPJ", async () => {
        const response = await request(app)
        .post('/users')
        .send(user);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Error while creating new User')
    });

    test("It should patch the user", async () => {
        user.nome = "updatedName";
        user.sobrenome = "updatedLastName";
        const response = await request(app)
        .patch(`/users/${user.id}`)
        .send(user)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe('updatedName');
        expect(response.body.sobrenome).toBe('updatedLastName');
    });

    test("It should return user invalid", async () => {
        const response = await request(app)
        .patch("/users/9999")
        .send(user)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User Not Found');
    });

    test("It should delete the user", async () => {
        const response = await request(app)
        .delete(`/users/${user.id}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted');
    });

    test("It should not authenticate inactive user", async () => {
        const response = await request(app)
        .post("/login")
        .send({ email: user.email, password: user.password })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Credenciais inválidas');
    });

})

module.exports = { user, moderator }