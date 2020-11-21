const request = require("supertest");
const app = require("../../src/app");
let { BarbeariaTeste, UsuarioTeste, ModeradorTeste } = require("../cases");

module.exports = () => {
    test("Não deve permitir que um usuário crie uma barberia", async () => {
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Rota restrita à moderadores");
    });

    test("Não deve permitir que o moderador crie uma barbearia sem informar um endereço completo", async () => {
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...BarbeariaTeste, cep: ""});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("É necessário informar um endereço, número, bairro, estado, cidade e cep para o comércio");
    });

    test("Não deve permitir que o moderador crie uma barbearia sem informar uma lista com os dias de funcionamento", async () => {
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...BarbeariaTeste, diaFuncionamento: ""});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("É necessário informar uma lista com os dias de funcionamento da barbearia");
    });

    test("Não deve permitir que um moderador crie uma barberia com falta de dados nos dias de funcionamento", async () => {
        BarbeariaTeste.endereco = "Testing";
        BarbeariaTeste.diaFuncionamento = null;
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("É necessário informar uma lista com os dias de funcionamento da barbearia");
    });

    test("Deve dar erro ao criar uma barbearia com dados inválidos", async () => {
        BarbeariaTeste.endereco = 1;
        BarbeariaTeste.diaFuncionamento = [0,1,2,3,4,5];
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Erro ao criar uma barbearia");
    });

    test("Deve permitir que um moderador crie uma barberia", async () => {
        BarbeariaTeste.endereco = "Testing";
        BarbeariaTeste.diaFuncionamento = [0,1,2,3,4,5];
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        BarbeariaTeste.id = response.body.id;
        expect(response.body.nome).toBe(BarbeariaTeste.nome);
        expect(response.body.endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body.telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body.horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body.ativo).toBe(true);
        expect(response.body.complemento).toBe(BarbeariaTeste.complemento);
        expect(response.body.numero).toBe(BarbeariaTeste.numero);
        expect(response.body.bloco).toBe(BarbeariaTeste.bloco);
        expect(response.body.cep).toBe(BarbeariaTeste.cep);
        expect(response.body.bairro).toBe(BarbeariaTeste.bairro);
        expect(response.body.cidade).toBe(BarbeariaTeste.cidade);
        expect(response.body.estado).toBe(BarbeariaTeste.estado);
    });

    test("Não deve permitir que um moderador crie outra barbearia", async () => {
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Usuário já possui uma barbearia ativa");
    });

    test("Deve retornar uma certa barbearia", async () => {
        const response = await request(app)
        .get(`/barbearias?nome=${BarbeariaTeste.nome}`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
        expect(response.body[0].nome).toBe(BarbeariaTeste.nome);
        expect(response.body[0].endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body[0].telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body[0].horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body[0].horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body[0].ativo).toBe(true);
    });

    test("Deve retornar uma certa barbearia por id", async () => {
        const response = await request(app)
        .get(`/barbearias/${BarbeariaTeste.id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.nome).toBe(BarbeariaTeste.nome);
        expect(response.body.endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body.telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body.horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body.ativo).toBe(true);
    });

    test("Deve retornar erro para a busca de uma certa barbearia por id que não existe", async () => {
        const response = await request(app)
        .get("/barbearias/99");
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Nenhuma barberia encontrada");
    });

    test("Deve retornar barbearia não encontrada ao buscar uma barbearia inexistente", async () => {
        const response = await request(app)
        .get(`/barbearias?nome=${999}`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Deve retornar uma lista com todas as barberias", async () => {
        const response = await request(app)
        .get("/barbearias");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body[0].nome).toBe(BarbeariaTeste.nome);
        expect(response.body[0].endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body[0].telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body[0].horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body[0].horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body[0].ativo).toBe(true);
    });

    test("Deve retornar uma barbearia válida pelo id", async () => {
        const response = await request(app)
        .get(`/barbearias/${BarbeariaTeste.id}`);

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe(BarbeariaTeste.nome);
        expect(response.body.endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body.telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body.horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body.ativo).toBe(true);
    });
    
    test("Deve retornar a barberia do moderador", async () => {
        const response = await request(app)
        .get("/barbearia")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`);

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe(BarbeariaTeste.nome);
        expect(response.body.endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body.telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body.horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body.ativo).toBe(true);
    });

    test("Não deve permitir que um usuário acesse a rota", async () => {
        const response = await request(app)
        .get("/barbearia")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Rota restrita à moderadores");        
    });

    test("Deve atualizar uma barbearia", async () => {
        BarbeariaTeste.nome = "Barbearia atualizada";
        BarbeariaTeste.endereco = "Novo endereço";
        const response = await request(app)
        .patch("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Barbearia atualizada");
        expect(response.body.endereco).toBe("Novo endereço");
    });

    test("Deve retornar erro ao atualizar uma barbearia", async () => {
        BarbeariaTeste.nome = "Barbearia atualizada";
        BarbeariaTeste.endereco = 1;
        const response = await request(app)
        .patch("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Erro ao atualizar barbearia");
        BarbeariaTeste.endereco = "Novo endereço";
    });

    test("Deve deletar uma barberia", async () => {
        const response = await request(app)
        .delete("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Barbearia deletada");
    });

    test("Não deve deletar uma barbearia já deletada", async () => {
        const response = await request(app)
        .delete("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Barbearia não encontrada");
    });

    test("Não deve atualizar uma barbearia deletada", async () => {
        const response = await request(app)
        .patch("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Barbearia não existe ou foi desativada");
    });

    test("Não deve retornar uma barberia que foi deletada", async () => {
        const response = await request(app)
        .get(`/barbearias/${BarbeariaTeste.id}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Esta barberia não está disponível");
    });

    test("Deve retornar que o moderador não tem uma barbearia", async () => {
        const response = await request(app)
        .get("/barbearia")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Nenhuma barberia encontrada");
    });

    test("Não deve permitir que um moderador crie outra barbearia no mesmo endereço", async () => {
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Esta barbearia já existe");
    });

    test("Deve permitir que um moderador crie uma barberia depois de deletar outra", async () => {
        BarbeariaTeste.endereco = "Novo Endereço";
        BarbeariaTeste.cep = "Novo Cep";
        BarbeariaTeste.diaFuncionamento = [0,1,2,3,4,5];
        const response = await request(app)
        .post("/barbearias")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        BarbeariaTeste.id = response.body.id;
        expect(response.body.nome).toBe(BarbeariaTeste.nome);
        expect(response.body.endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body.telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body.horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body.ativo).toBe(true);
        expect(response.body.complemento).toBe(BarbeariaTeste.complemento);
        expect(response.body.numero).toBe(BarbeariaTeste.numero);
        expect(response.body.bloco).toBe(BarbeariaTeste.bloco);
        expect(response.body.cep).toBe(BarbeariaTeste.cep);
        expect(response.body.bairro).toBe(BarbeariaTeste.bairro);
        expect(response.body.cidade).toBe(BarbeariaTeste.cidade);
        expect(response.body.estado).toBe(BarbeariaTeste.estado);
    });
};
