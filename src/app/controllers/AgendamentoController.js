"use strict";

const { StatusAgendamento, Agendamento, Servico, Barbearia, Usuario } = require("../models");
const Sequelize = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;

function isDateValid(isoDate) {
    return typeof(isoDate) === "string" && isoDate.match(/^(\d{4})-(\d){2}-(\d){2}T(\d{2}?:\d{2}:\d{2}\.\d{3}Z$)/g);
}

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

            const response = agendamentos.map((item) => {
                return {
                    id: item.id,
                    idBarbearia: item.idBarbearia,
                    idServico: item.idServico,
                    id_status: item.status.id,
                    nome_servico: item.servico.titulo,
                    status: item.status.nome,
                    data: item.data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
                };
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
            let { userId } = req;

            const barbearia = await Barbearia.findOne({
                where: {
                    user_id: userId,
                    ativo: true
                }
            })

            if(!barbearia) {
                return res.status(400).json({ message: "Usuário não tem barbearia" });
            }

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
                where: { 
/*                     data:  { 
                        [Op.gte]: moment().format("YYYY-MM-DD")
                    }, */
                    idBarbearia: barbearia.id
                },
                order: [
                    ["data", "ASC"]
                ]
            });

            const response = agendamentos.map((item) => {
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
                };
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
            let { idBarbearia, idServico, data } = req.body;
            const { userId } = req;

            
            if (!idBarbearia || !idServico || !data) {
                return res.status(400).json({ message: "Falta dados para completar a ação"});
            }

            if (!isDateValid(data)) {
                return res.status(400).json({ message: "É necessário informar uma data válida no formato ISO para criar um agendamento" });
            }

            // Remove os segundos para procurar e salvar. uma vez que os mesmos são irrelevantes
            data = data.replace(/:\d{2}\.\d{3}Z$/g, "Z");

            let barbearia = await Barbearia.findByPk(idBarbearia);
            if (!barbearia) {
                return res.status(400).json({ message: "Não é possível criar um agendamento para uma barbearia inexistente" });
            }


            let servico = await Servico.findByPk(idServico);
            if (!servico) {
                return res.status(400).json({ message: "Não é possível criar um agendamento para um serviço inexistente" });
            }

            let agendamento = await Agendamento.findOne({ 
                where: {
                    data
                }
            });

            if (agendamento) {
                return res.status(400).json({ message: "Não é possível criar um agendamento, o horário informado já está ocupado" });
            }

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

            const agendamento = await Agendamento.findByPk(id);

            if(!agendamento) {
                return res.status(400).json({ message: "Não existe este agendamento" });            
            }
            
            const status = await StatusAgendamento.findByPk(idStatus);

            if(!status) {
                return res.status(400).json({ message: "Não existe este status" });            
            }

            await agendamento.update({ 
                idStatus
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
            
            if (agendamento.idUsuario === usuario.id) {
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
