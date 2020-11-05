'use strict'

const { StatusAgendamento, Agendamento, Servico, Barbearia, Usuario } = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment');
const { Op } = Sequelize;

module.exports = {
    async getMyAgendamentos(req, res) {
        let { user_id } = req.query;

        try {

            await Agendamento.findAll({
                include : [
                    {
                        model: Servico,
                        required: true
                    },
                    {
                        model: StatusAgendamento,
                        required: true
                    },
                    {
                        model: Barbearia,
                        required: true
                    }
                ],
                where: { 
                    idUsuario: user_id
                }
            }).then(items => {
                const response = items.map( item => {
                    // return item
                    return {
                        id: item.id,
                        id_barbearia: item.idBarbearia,
                        id_servico: item.idServico,
                        id_status: item.StatusAgendamento.id,
                        nome_servico: item.Servico.titulo,
                        status: item.StatusAgendamento.nome,
                        data: item.data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                    }
                });
                
                if(!response) {
                    return res.status(400).json({ message: 'Nenhum agendamento encontrado'});
                }
                
                return res.status(200).json(response);
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar agendamentos' });
        }
    },

    async getAgendamentosBarbearia(req, res) {
        try {

            await Agendamento.findAll({
                include : [
                    {
                        model: Servico,
                        required: true
                    },
                    {
                        model: StatusAgendamento,
                        required: true
                    },
                    {
                        model: Barbearia,
                        required: true
                    },
                    {
                        model: Usuario,
                        required: true
                    }
                ],
                where: { 
                    data:  { 
                        [Op.gte]: moment().format('YYYY-MM-DD')
                    }
                }
            }).then(items => {
                const response = items.map( item => {
                    // return item
                    return {
                        id: item.id,
                        id_barbearia: item.idBarbearia,
                        id_servico: item.idServico,
                        id_status: item.StatusAgendamento.id,
                        id_usuario: item.idUsuario,
                        nome_usuario: item.Usuario.nome,
                        nome_servico: item.Servico.titulo,
                        status: item.StatusAgendamento.nome,
                        data: item.data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                    }
                });
                
                if(!response) {
                    return res.status(400).json({ message: 'Nenhum agendamento encontrado'});
                }
                
                return res.status(200).json(response);
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar agendamentos' });
        }
    },

    async create(req, res) {
        return res.status(200).json();
    },

    async cancel(req, res) {
        return res.status(200).json();
    }
};