'use strict'

const { Barbearia, Usuario } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = {
    async obterBarbearias(req, res) {
        try {
            let { nome } = req.query;
            nome = (nome)? nome.replace('+', ' ') : '';
            const barbearia = await Barbearia.findAll({
                where: { 
                    nome:  { 
                        [Op.iLike]: `%${nome}%`
                    }
                }
            });
            
            if (!barbearia) {
                return res.status(400).json({ message: 'Nenhuma barberia encontrada'});
            }
            
            return res.status(200).json(barbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar barberia' });
        }
    },

    async obterBarbeariaModerador(req, res) {
        try {
            const { userId } = req;
            const barbearia = await Barbearia.findOne({
                where: { 
                    user_id: userId
                }
            });
            
            if (!barbearia) {
                return res.status(400).json({ message: 'Nenhuma barberia encontrada'});
            }
            
            return res.status(200).json(barbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar barberia' });
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
                return res.status(400).json({ message: 'Nenhuma barberia encontrada'});
            }
            
            return res.status(200).json(barbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar barberias' });
        }
    },

    async cadastrarBarbearia(req, res) {
        try {
            const { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, complemento, numero, bloco, cep, bairro, cidade, estado } = req.body;
            const { userId } = req;
            const barberia = await Barbearia.findOne({ 
                where: { 
                    user_id: userId
                }
            });
            
            if (barberia) {
                return res.status(400).json({ message: 'Usuário já possui uma barbearia'});
            }
            
            if (!endereco || !numero || !cep)
                return res.status(400).json({ message: 'É necessário informar um endereço, número e cep para o comércio'});
            

            const barberiaExists = await Barbearia.findOne({ 
                where: { 
                    endereco,
                    numero
                    // ,
                    // $or: [
                    //     {
                    //         cep
                    //     }
                    // ]
                }
            });


            if (barberiaExists) {
                return res.status(400).json({ message: 'Esta barbearia já existe'});
            }

            const novaBarbearia = await Barbearia.create({ nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, user_id: userId, complemento, numero, bloco, cep, bairro, cidade, estado });
            return res.status(201).json(novaBarbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao criar uma barbearia' });
        }

    },

    async atualizarBarbearia(req, res) {
        try {
            const { userId } = req;
            const { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, bairro, cidade, estado } = req.body;
            const barberia = await Barbearia.findOne({
                where: {
                    [Op.or]: [
                        { user_id: userId },
                    ]
                } 
            });
            
            
            if (!barberia) {
                return res.status(400).json({ message: 'Barbearia não encontrada'});
            }
            
            const barbeariaAtualizada = await barberia.update({
                nome: nome || barberia.nome,
                endereco: endereco || barberia.endereco,
                telefone: telefone || barberia.telefone,
                horarioAbertura: horarioAbertura || barberia.horarioAbertura,
                horarioFechamento: horarioFechamento || barberia.horarioFechamento,
                icone: icone || barberia.icone,
                bairro: bairro || barberia.bairro,
                cidade: cidade || barberia.cidade,
                estado: estado || barberia.estado,
            });
            
            return res.status(200).json(barbeariaAtualizada);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao atualizar barbearia'})
        }
    },

    async desativarBarbearia(req, res) {
        try {
            const  { userId } = req;
            const barbearia = await Barbearia.findOne({
                where: {
                    [Op.or]: [
                        { user_id: userId },
                    ]
                }  
            });

            if (!barbearia) {
                return res.status(400).json({ message: 'Barbearia não encontrada' });
            }

            await barbearia.update({ 
                ativo: false
            })
    
            return res.status(200).json({ message: 'Barbearia deletada' });
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao deletar barberia' });
        }
    }
};
