const { Avaliacao } = require("../models");
const { Usuario } = require("../models");
const { Agendamento } = require("../models");
const { Servico } = require("../models");
const { Barbearia } = require("../models");

module.exports = {

    async obterAvaliacoesBarbearia(req, res) {
        try {
            const { barbearia_id } = req.params;
            let avaliacoes = await Avaliacao.findAll({
                where: {
                    idBarbearia: barbearia_id
                },
                order: [
                    ["id", "DESC"]
                ]
            });
            return res.status(200).json(avaliacoes);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar avaliações" });
        }
    },

    async criarAvaliacao(req, res) {
        try {
            const { titulo, descricao, nota, idAgendamento} = req.body;
            const { userId }  = req;
            const agendamento = await Agendamento.findByPk(idAgendamento);

            if (!agendamento) {
                return res.status(400).json({ message: "Agendamento inexistente" });
            }

            if (agendamento.idUsuario !== userId) {
                return res.status(400).json({ message: "Este agendamento pertence à outro usuário" });
            }

            if (agendamento.idStatus !== 3) {
                return res.status(400).json({ message: "Este agendamento não foi concluído" });
            }

            const avaliacaoExistente = await Avaliacao.findOne({
                where: {
                    idUsuario: userId,
                    idAgendamento
                }
            });

            if (avaliacaoExistente) {
                return res.status(400).json({ message: "Usuário já realizou esta avaliação" });
            }

            let avaliacao = await Avaliacao.create({ titulo, descricao, nota, idBarbearia: agendamento.idBarbearia, idServico: agendamento.idServico, idAgendamento, idUsuario: userId });

            return res.status(200).json(avaliacao);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao cadastrar avaliação" });
        }
    },

    async excluirAvaliacao(req, res) {
        try {
            const { avaliacao_id } = req.params;
            const { userId }  = req;
            const avaliacao = await Avaliacao.findByPk(avaliacao_id);

            if (!avaliacao) {
                return res.status(400).json({ message: "Avaliação inexistente" });
            }

            if (avaliacao.idUsuario !== userId) {
                return res.status(400).json({ message: "Avaliação não pertence à este usuário" });
            }

            await Avaliacao.destroy({
                where: {
                    id: avaliacao_id
                }
            });
            
            return res.status(200).json({ message: "Avaliação deletada com sucesso"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao excluir avaliação" });
        }
    }
};
