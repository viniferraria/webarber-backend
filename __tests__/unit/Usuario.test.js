const { Usuario } = require("../../src/app/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

describe( "User", () => {} );

let mockUsuario = {
    id: 1,
    nome: "viniteste1",
    sobrenome: "teste",
    email: "viniteste@teste.com",
    password: "123456",
    idTipo: 1
};

let usuario;

it("Deve criptografar a senha de um usuário", async () => {
    usuario = await Usuario.create(mockUsuario);
    
    const compareHash = await bcrypt.compare("123456", user.password_hash);
    expect(compareHash).toBe(true);
});

it("Deve gerar um token válido para um usuário", async () => {    
    let token = usuario.generateToken();
    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    } catch (err) {
        console.error(err);
    }
    
    expect(decoded.id).toBe(usuario.id);
    expect(decoded.idTipo).toBe(usuario.idTipo);
});