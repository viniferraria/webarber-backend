"use strict"

const { StatusAgendamento, Agendamento, Servico, Barbearia, Usuario } = require("../models");
const Sequelize = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;

module.exports = {
    async obterAgendamentosUsuario(req, res) {
        try {
            let { userId } = req;
            const agendamentos = await Agendamento.findAll({
                include : [
                    {
                        model: Servico,
                        required: true,
                        as: "servico"
                    },
                    {
                        model: StatusAgendamento,
                        required: true,
                        as: "status"
                    },
                    {
                        model: Barbearia,
                        required: true,
                        as: "barbearia"
                    }
                ],
                where: { 
                    idUsuario: userId
                },
                order: [
                    ["data", "DESC"]
                ]
            });

            const response = agendamentos.map( item => {
                return {
                    id: item.id,
                    idBarbearia: item.idBarbearia,
                    idServico: item.idServico,
                    id_status: item.status.id,
                    nome_servico: item.servico.titulo,
                    status: item.status.nome,
                    data: item.data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
                }
            });
            
            if (!response) {
                return res.status(400).json({ message: "Nenhum agendamento encontrado"});
            }
            
            return res.status(200).json(response);

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar agendamentos" });
        }
    },

    async obterAgendamentosBarbearia(req, res) {
        try {
            const { barbearia_id } = req.params;

            const agendamentos = await Agendamento.findAll({
                include : [
                    {
                        model: Servico,
                        required: true,
                        as: "servico"
                    },
                    {
                        model: StatusAgendamento,
                        required: true,
                        as: "status"
                    },
                    {
                        model: Barbearia,
                        required: true,
                        as: "barbearia"
                    },
                    {
                        model: Usuario,
                        required: true,
                        as: "usuario"
                    }
                ],
                // Pega todos os agendamentos do dia de hoje
                // where: { 
                //     data:  { 
                //         [Op.gte]: moment().format("YYYY-MM-DD")
                //     },
                //     idBarbearia: barbearia_id
                // },
                order: [
                    ["data", "ASC"]
                ]
            });

            const response = agendamentos.map( item => {
                return {
                    id: item.id,
                    idBarbearia: item.idBarbearia,
                    idServico: item.idServico,
                    id_status: item.status.id,
                    id_usuario: item.idUsuario,
                    nome_usuario: item.usuario.nome,
                    nome_servico: item.servico.titulo,
                    status: item.status.nome,
                    data: item.data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
                }
            });
            
            if(!response) {
                return res.status(400).json({ message: "Nenhum agendamento encontrado"});
            }
            
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar agendamentos" });
        }
    },

    async criarAgendamento(req, res) {
        try {
            const { idBarbearia, idServico, data } = req.body;
            const { userId } = req;
            if (!idBarbearia || !idServico || !data) {
                return res.status(400).json({ message: "Falta dados para completar a ação"});
            }

            // TODO: Por validações aqui

            const novoAgendamento = await Agendamento.create({ idBarbearia, idUsuario: userId, idServico, data });
            return res.status(201).json(novoAgendamento);

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao criar um agendamento" });
        }
    },

    async atualizarStatusAgendamento(req, res) {
        try {
            const { id, idStatus } = req.body;
            const { userId } = req;
            if (!id || !userId || !idStatus) {
                return res.status(400).json({ message: "Falta dados para completar a ação" });
            }

            // let usuario = await Usuario.findByPk(userId);

            // if(usuario.idTipo == 1) {
            //     return res.status(400).json({ message: "É necessário informar um moderador para atualizar um agendamento" });
            // }

            const agendamento = await Agendamento.findByPk(id);

            if(!agendamento) {
                return res.status(400).json({ message: "Não existe este agendamento" });            
            }
            
            const status = await StatusAgendamento.findByPk(idStatus);

            if(!status) {
                return res.status(400).json({ message: "Não existe este status" });            
            }

            await agendamento.update({ 
                idStatus: idStatus
            });

            return res.status(200).json({ message: "Agendamento atualizado" });  
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao atualizar um agendamento" });
        }
    },

    async cancelarAgendamento(req, res) {
        const { id } = req.body;
        const { userId } = req;
        
        try {
            const agendamento = await Agendamento.findByPk(id);

            if (!agendamento) {
                return res.status(400).json({ message: "Não existe este agendamento" });            
            }

            const usuario = await Usuario.findByPk(userId);

            if (!usuario) {
                return res.status(400).json({ message: "Não existe este usuário" });            
            }
            
            if (agendamento.idUsuario == usuario.id) {
                await agendamento.update({ 
                    idStatus: 4
                });

                return res.status(200).json({ message: "Agendamento cancelado" });    
            }
            return res.status(400).json({ message: "Este agendamento não pertence à este usuário" });    
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao cancelar um agendamento" });
        }
    }
};