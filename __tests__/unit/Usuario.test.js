const { Usuario } = require("../../src/app/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { UsuarioTesteIntegration } = require("../cases");


describe("User", () => {    
    it("Deve criar um usuário, criptografar a senha e gerar um token válido", async () => {    
        try {
            let usuario = await Usuario.create(UsuarioTesteIntegration);
            UsuarioTesteIntegration.id = usuario.id; 
            // valida a senha
            const compareHash = await bcrypt.compare(UsuarioTesteIntegration.password, usuario.password_hash);
            
            // valida o token
            usuario.generateToken();
            let decoded = await promisify(jwt.verify)(usuario.sessionToken, process.env.APP_SECRET);
            UsuarioTesteIntegration.jwt = usuario.sessionToken;

            expect(compareHash).toBe(true);
            expect(decoded.id).toBe(UsuarioTesteIntegration.id);
            expect(decoded.idTipo).toBe(UsuarioTesteIntegration.idTipo);
        } catch (err) {
            return err;
        }
    });
});
