const { Usuario } = require("../../src/app/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

let mockUsuario = {
    id: 1,
    nome: "viniteste1",
    sobrenome: "teste",
    email: "viniteste@teste.com",
    password: "123456",
    idTipo: 1
};

let usuario;

describe("User", () => {
    describe( "Teste senha", () => {
        it("Deve criptografar a senha de um usuário", async () => {
            usuario = await Usuario.create(mockUsuario);
            mockUsuario.id = usuario.id;
            const compareHash = await bcrypt.compare(mockUsuario.password, usuario.password_hash);
            expect(compareHash).toBe(true);
        });
    });

    describe("Teste token", () => {
        it("Deve gerar um token válido para um usuário", async () => {    
            try {
                usuario.generateToken();
                let decoded = await promisify(jwt.verify)(usuario.sessionToken, process.env.APP_SECRET);
                expect(decoded.id).toBe(mockUsuario.id);
                expect(decoded.idTipo).toBe(mockUsuario.idTipo);
            } catch (err) {
                console.error(err);
            }
        });
    });
});