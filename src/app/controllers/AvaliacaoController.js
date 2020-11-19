const { Avaliacao } = require("../models");
const { Usuario } = require("../models");
const { Agendamento } = require("../models");
const { Servico } = require("../models");
const { Barbearia } = require("../models");

module.exports = {

    async obterAvaliacoesBarbearia(req, res) {
        const { barbearia_id } = req.params;
        try {
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
        const { titulo, descricao, nota, idBarbearia, idServico, idAgendamento} = req.body;
        const { userId }  = req;

        const barbearia = await Barbearia.findByPk(idBarbearia);

        if(!barbearia) {
            return res.status(400).json({ message: "Barbearia inexistente" });
        }

        const servico = await Servico.findByPk(idServico);

        if(!servico) {
            return res.status(400).json({ message: "Serviço inexistente" });
        }

        const agendamento = await Agendamento.findByPk(idAgendamento);

        if(!agendamento) {
            return res.status(400).json({ message: "Agendamento inexistente" });
        }

        if(agendamento.idUsuario !== userId) {
            return res.status(400).json({ message: "Este agendamento pertence à outro usuário" });
        }

        if(agendamento.idStatus !== 3) {
            return res.status(400).json({ message: "Este agendamento não foi concluído" });
        }
        
        const avaliacao = await Avaliacao.findOne({
            where: {
                idUsuario: userId,
                idAgendamento: idAgendamento
            }
        });

        if(avaliacao) {
            return res.status(400).json({ message: "Usuário já realizou esta avaliação" });
        }

        try {
            let avaliacao = await Avaliacao.create({ titulo, descricao, nota, idBarbearia, idServico, idAgendamento, idUsuario: userId });
            
            // TODO: Colocar para atualizar a média da nota da barbearia por trigger aqui

            await barbearia.update({ 
                media: nota
            });

            return res.status(200).json(avaliacao);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao cadastrar avaliação" });
        }
    },

    async excluirAvaliacao(req, res) {
        const { avaliacao_id } = req.params;
        const { userId }  = req;

        const avaliacao = await Avaliacao.findByPk(avaliacao_id);

        if(!avaliacao) {
            return res.status(400).json({ message: "Avaliação inexistente" });
        }

        if(avaliacao.idUsuario !== userId) {
            return res.status(400).json({ message: "Avaliação não pertence à este usuário" });
        }

        try {
            await Avaliacao.destroy({
                where: {
                    id: avaliacao_id
                }
            });
            
            // TODO: Colocar para atualizar a média da nota da barbearia por trigger aqui

            return res.status(200).json({ message: "Avaliação deletada com sucesso"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao excluir avaliação" });
        }
    }

}