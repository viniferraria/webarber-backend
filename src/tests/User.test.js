const req = require('supertest');
const server = require('../server');

var id = 1
var user = {
    name: "Teste",
    email: "teste@teste.com",
    password: "teste123"
}

test("[POST] Create a user", async () => {

    await req(server)
    .post("/users")
    .send(user)
    .expect(201)
    .expect('Content-Type', /json/)
    // .expect({ name: user.name })
    // // .set('Accept', 'application/json')
    // // .expect('Content-Type', /json/)
    // // .expect(201)
    .then((response) => {
        expect(response.body.name).toBe(user.name)
        expect(response.body.email).toBe(user.email)
        expect(response.body.password).toBe(user.password)
        id = response.body.id
    })
});

test("[GET] Login", async () => {

    await req(server)
    .get("/users")
    .send(user)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((response) => {
        expect(response.body.id).toBe(id)
        expect(response.body.name).toBe(user.name)
        expect(response.body.email).toBe(user.email)
        expect(response.body.password).toBe(user.password)
    })
});

test("[PATCH] Update a user", async () => {
    user.name = "Teste2"

    await req(server)
    .patch("/users/" + id)
    .send(user)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((response) => {
        expect(response.body.id).toBe(id)
        expect(response.body.name).toBe(user.name)
        expect(response.body.email).toBe(user.email)
        expect(response.body.password).toBe(user.password)
    })
});

test("[PATCH] Update a user", async () => {
    await req(server)
    .delete("/users/" + id)
    .expect(200)
});