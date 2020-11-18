const { Usuario } = require("../../src/app/models");
const bcrypt = require("bcryptjs");

describe( "User", () => {} );

it("should encrypt user password", async () => {
    const user = await Usuario.create({
        nome: "viniteste1",
        sobrenome: "teste",
        email: "viniteste@teste.com",
        password: "123456",
        idTipo: 1
    });
    
    const compareHash = await bcrypt.compare("123456", user.password_hash);
    expect(compareHash).toBe(true);
})
