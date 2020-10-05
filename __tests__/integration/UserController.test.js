const request = require("supertest");
const app = require("../../src/app");

var id = 1
var user = {
    name: "Teste",
    email: "teste@teste.com",
    password: "teste123"
}

describe("Test the root path", () => {
test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    });
});

// test("[POST] Create a user", () => {

//     request(app)
//     .post("/users")
//     .send(user)
//     .expect(response.statusCode).toBe(201)
//     .expect('Content-Type', /json/)
//     // .expect({ name: user.name })
//     // .set('Accept', 'application/json')
//     // .expect('Content-Type', /json/)
//     // .expect(201)
//     .then((response) => {
//         expect(response.body.name).toBe(user.name)
//         expect(response.body.email).toBe(user.email)
//         expect(response.body.password).toBe(user.password)
//         id = response.body.id
//     })
// });

// test("[GET] Login", async () => {

//     await request(app)
//     .get("/users")
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .then((response) => {
//         expect(response.body.id).toBe(id)
//         expect(response.body.name).toBe(user.name)
//         expect(response.body.email).toBe(user.email)
//         expect(response.body.password).toBe(user.password)
//     })
// });

// test("[PATCH] Update a user", async () => {
//     user.name = "Teste2"

//     await request(app)
//     .patch("/users/" + id)
//     .send(user)
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .then((response) => {
//         expect(response.body.id).toBe(id)
//         expect(response.body.name).toBe(user.name)
//         expect(response.body.email).toBe(user.email)
//         expect(response.body.password).toBe(user.password)
//     })
// });

// test("Delete a user", async () => {
//     await request(app)
//     .delete("/users/" + id)
//     .expect(200)
// }); 