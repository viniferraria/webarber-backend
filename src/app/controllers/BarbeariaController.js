"use strict";

const { Barbearia, Usuario } = require("../models");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

module.exports = {
    async obterBarbearias(req, res) {
        try {
            let { nome } = req.query;
            nome = (nome) ? nome.replace("+", " ") : "";
            const barbearia = await Barbearia.findAll({
                where: {
                    nome: {
                        [Op.iLike]: `%${nome}%`
                    },
                    ativo: true
                }
            });

            if (!barbearia) {
                return res.status(400).json({ message: "Nenhuma barberia encontrada" });
            }

            return res.status(200).json(barbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar barberia" });
        }
    },

    async obterBarbeariaModerador(req, res) {
        try {
            const { userId } = req;
            const barbearia = await Barbearia.findOne({
                where: {
                    user_id: userId,
                    ativo: true
                }
            });

            if (!barbearia) {
                return res.status(400).json({ message: "Nenhuma barberia encontrada" });
            }

            return res.status(200).json(barbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar barberia" });
        }
    },

    async obterBarbeariaPorId(req, res) {
        try {
            const { barbearia_id } = req.params;
            const barbearia = await Barbearia.findOne({
                where: {
                    id: barbearia_id
                }
            });

            if (!barbearia) {
                return res.status(400).json({ message: "Nenhuma barberia encontrada" });
            }

            if (!barbearia.ativo) {
                return res.status(400).json({ message: "Esta barberia não está disponível" });
            }

            return res.status(200).json(barbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar barberias" });
        }
    },

    async cadastrarBarbearia(req, res) {
        try {
            let { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, complemento, numero, bloco, cep, bairro, cidade, estado, diaFuncionamento } = req.body;
            const { userId } = req;

            // Procurar se o moderador já possui uma barbearia
            const barberia = await Barbearia.findOne({
                where: {
                    user_id: userId,
                    ativo: true
                }
            });

            if (barberia) {
                return res.status(400).json({ message: "Usuário já possui uma barbearia ativa" });
            }

            if (!endereco || !numero || !cep || !bairro || !cidade || !estado) {
                return res.status(400).json({ message: "É necessário informar um endereço, número, bairro, estado, cidade e cep para o comércio" });
            }

            if (!(diaFuncionamento instanceof Array)) {
                return res.status(400).json({ message: "É necessário informar uma lista com os dias de funcionamento da barbearia" });
            }

            diaFuncionamento = [...new Set(diaFuncionamento)];
            diaFuncionamento = diaFuncionamento.filter((dia) => ["segunda","terca", "quarta", "quinta", "sexta", "sabado","domingo"].includes(dia));

            if (diaFuncionamento.length === 0) {
                return res.status(400).json({ message: "É necessário informar pelo menos um dia de funcionamento" });
            }
            
            const barberiaExists = await Barbearia.findOne({
                where: {
                    [Op.or]: [
                        { endereco },
                        { cep }
                    ]
                }
            });

            if (barberiaExists) {
                return res.status(400).json({ message: "Esta barbearia já existe" });
            }

            const novaBarbearia = await Barbearia.create({ nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, user_id: userId, complemento, numero, bloco, cep, bairro, cidade, estado, diaFuncionamento });
            return res.status(201).json(novaBarbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao criar uma barbearia" });
        }

    },

    async atualizarBarbearia(req, res) {
        try {
            const { userId } = req;
            let { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, complemento, numero, bloco, cep, bairro, cidade, estado, diaFuncionamento } = req.body;
            const barbearia = await Barbearia.findOne({
                where: {
                    user_id: userId
                }
            });

            if (!barbearia || !barbearia.ativo) {
                return res.status(400).json({ message: "Barbearia não existe ou foi desativada" });
            }

            let barbeariaExists; 
            if (endereco || cep) {
                barbeariaExists = await Barbearia.findOne({
                    where: {
                        [Op.or]: [
                            { endereco },
                            { cep }
                        ]
                    }
                });
            }

            // Não deve permitir que o moderador crie uma barbearia caso já exista uma barbearia ativa no mesmo endereço
            if (barbeariaExists && barbeariaExists.ativo && barbeariaExists.user_id !== userId) {
                return res.status(400).json({ message: "O novo endereço informado já está cadastrado " });
            }

            diaFuncionamento = (diaFuncionamento instanceof Array && diaFuncionamento.length > 0) ?
                diaFuncionamento = [...new Set(diaFuncionamento)]
                : "";

            const barbeariaAtualizada = await barbearia.update({
                nome: nome || barbearia.nome,
                endereco: endereco || barbearia.endereco,
                telefone: telefone || barbearia.telefone,
                horarioAbertura: horarioAbertura || barbearia.horarioAbertura,
                horarioFechamento: horarioFechamento || barbearia.horarioFechamento,
                icone: icone || barbearia.icone,
                complemento: complemento || barbearia.complemento,
                numero: numero || barbearia.numero,
                bloco: bloco || barbearia.bloco,
                cep: cep || barbearia.cep,
                bairro: bairro || barbearia.bairro,
                cidade: cidade || barbearia.cidade,
                estado: estado || barbearia.estado,
                diaFuncionamento: diaFuncionamento || barbearia.diaFuncionamento
            });

            return res.status(200).json(barbeariaAtualizada);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao atualizar barbearia" });
        }
    },

    async desativarBarbearia(req, res) {
        try {
            const { userId } = req;
            const barbearia = await Barbearia.findOne({
                where: {
                    user_id: userId,
                    ativo: true
                }
            });

            if (!barbearia) {
                return res.status(400).json({ message: "Barbearia não encontrada" });
            }

            await barbearia.update({
                ativo: false
            });

            return res.status(200).json({ message: "Barbearia deletada" });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao deletar barberia" });
        }
    }
};
