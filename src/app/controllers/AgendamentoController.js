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
                console.log(items.length);
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
        const { barbearia_id } = req.params;
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
                        [Op.gte]: moment().format('YYYY-DD-MM')
                    },
                    idBarbearia: barbearia_id
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
        const { idBarbearia, idUsuario, idServico, data } = req.body;
        
        try {
            if (!idBarbearia || !idUsuario || !idServico || !data) {
                return res.status(400).json({ message: 'Falta dados para completar a ação'});
            }

            // TODO: Por validações aqui

            const novoAgendamento = await Agendamento.create({ idBarbearia, idUsuario, idServico, data });
            return res.status(201).json(novoAgendamento);

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao criar um agendamento' });
        }
    },

    async update(req, res) {
        const { id, idUsuario, idStatus } = req.body;
        
        try {
            if (!id || !idUsuario || !idStatus) {
                return res.status(400).json({ message: 'Falta dados para completar a ação' });
            }

            let usuario = await Usuario.findByPk(idUsuario);

            if(usuario.idTipo == 1) {
                return res.status(400).json({ message: 'É necessário informar um moderador para atualizar um agendamento' });
            }

            const agendamento = await Agendamento.findByPk(id);

            if(!agendamento) {
                return res.status(400).json({ message: 'Não existe este agendamento' });            
            }
            
            const status = await StatusAgendamento.findByPk(idStatus);

            if(!status) {
                return res.status(400).json({ message: 'Não existe este status' });            
            }

            await agendamento.update({ 
                idStatus: idStatus
            });

            return res.status(200).json({ message: 'Agendamento atualizado' });  
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao atualizar um agendamento' });
        }
    },

    async cancel(req, res) {
        const { id, idUsuario } = req.body;
        
        try {
            if (!id || !idUsuario) {
                return res.status(400).json({ message: 'Falta dados para completar a ação' });
            }

            const agendamento = await Agendamento.findByPk(id);

            if(!agendamento) {
                return res.status(400).json({ message: 'Não existe este agendamento' });            
            }

            const usuario = await Usuario.findByPk(idUsuario);

            if(!usuario) {
                return res.status(400).json({ message: 'Não existe este usuário' });            
            }
            
            if(agendamento.idUsuario == usuario.id) {
                await agendamento.update({ 
                    idStatus: 4
                });

                return res.status(200).json({ message: 'Agendamento cancelado' });    
            } else {
                return res.status(400).json({ message: 'Este agendamento não pertence à este usuário' });    
            }  
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao cancelar um agendamento' });
        }
    }
};