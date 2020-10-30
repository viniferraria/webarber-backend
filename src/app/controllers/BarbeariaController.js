'use strict'

const { Barbearia, Usuario } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = {
    async get(req, res) {
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

    async getMyBarbearias(req, res) {
        try {
            const { user_id } = req.params;
            const barbearia = await Barbearia.findAll({
                where: { 
                    user_id: user_id
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

    async create(req, res) {
        try {
            const { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, user_id } = req.body;
            
            if (!user_id) {
                console.log('É necessário o id do moderador para associar uma barbearia');
                return res.status(400).json({ message: 'É necessário informar o moderador'});
            }
            
            const barberia = await Barbearia.findOne({ 
                where: { 
                    nome:  { 
                        [Op.iLike]: `%${nome}%`
                    }
                }
            });
            
            if (barberia) {
                return res.status(400).json({ message: 'Já existe uma barbearia com este nome'});
            }
            

            let usuario = await Usuario.findByPk(user_id);
            if (usuario.idTipo == 1) {
                console.log('É necessário ser um moderador para criar uma barbearia');
                return res.status(400).json({ message: 'É necessário informar um moderador para criar uma barbearia' });
            }

            const novaBarbearia = await Barbearia.create({ nome, endereco, telefone, horarioAbertura, horarioFechamento, icone, user_id });
            return res.status(201).json(novaBarbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao criar uma barbearia' });
        }

    },

    async update(req, res) {
        try {
            const { barbearia_id } = req.params;
            const { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone } = req.body;
            const barberia = await Barbearia.findByPk(barbearia_id);
            
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
            });
            
            return res.status(200).json(barbeariaAtualizada);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao atualizar barbearia'})
        }
    },

    async delete(req, res) {
        try {

            const { barbearia_id } = req.params;
            const barbearia = await Barbearia.findByPk(barbearia_id);

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