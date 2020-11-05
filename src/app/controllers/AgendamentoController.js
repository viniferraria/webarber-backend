'use strict'

const { StatusAgendamento, Agendamento, Servico, Barbearia, Usuario } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = {
    async getMyAgendamentos(req, res) {
        try {
            const agendamentos = await Agendamento.findAll({
                where: { 
                    data:  { 
                        [Op.gte]: moment().subtract(7, 'days').toDate()
                    }
                }
            });
            
            if(!agendamentos) {
                return res.status(400).json({ message: 'Nenhum agendamento encontrado'});
            }
            
            return res.status(200).json(agendamentos);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar agendamentos' });
        }
    },

    async getAgendamentosBarbearia(req, res) {
        return res.status(200).json();
    },

    async create(req, res) {
        return res.status(200).json();
    },

    async cancel(req, res) {
        return res.status(200).json();
    }
};