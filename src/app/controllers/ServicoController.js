const { Servico } = require("../models");
const { Barbearia } = require("../models");

module.exports = {

    async obterServicosBarbearia(req, res) {
        try {
            const { barbearia_id } = req.params;
        
            const barbearia = await Barbearia.findOne({ where: { 
                id: barbearia_id
            }});
            
            if (!barbearia) {
                return res.status(400).json({ message: "Barbearia não encontrada"});
            }
            const servico = await Servico.findAll({ where: { 
                barbearia_id: barbearia_id,
                ativo: true
            }});

            if (!servico) {
                return res.status(400).json({ message: "Não há serviços"});
            }
            
            return res.status(200).json(servico);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar serviços da barbearia" });
        }
    },

    async obterServicoPorId(req, res) {
        try {
            const { servico_id } = req.params;
            const servico = await Servico.findOne({ where: { 
                id: servico_id,
                ativo: true
            }});
            
            if(!servico) {
                return res.status(400).json({ message: "Serviço não encontrado"});
            }
            
            return res.status(200).json(servico);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao buscar serviço" });
        }
    },

    async criarServico(req, res) {
        try {
            const { titulo, preco, descricao, barbearia_id } = req.body;
            const servico = await Servico.findOne({ where: { titulo: titulo, barbearia_id: barbearia_id }});
            const barbearia = await Barbearia.findOne({ where: { 
                id: barbearia_id
            }});
            
            if(!barbearia) {
                return res.status(400).json({ message: "Barbearia não encontrada"});
            }
            
            if(servico) {
                return res.status(400).json({ message: "Já existe um serviço com este nome para esta barbearia"});
            }

            const novoServico = await Servico.create({ titulo, preco, descricao, barbearia_id });
            return res.status(201).json(novoServico);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao criar um serviço" });
        }

    },

    async atualizarServico(req, res) {
        const { servico_id } = req.params;
        const { titulo, descricao, preco } = req.body;

        const servico = await Servico.findByPk(servico_id);

        if (!servico) {
            return res.status(400).json({ message: "Serviço não encontrado"});
        }

        const servicoAtualizado = await servico.update({
            titulo: titulo || servico.titulo,
            preco: preco || servico.preco,
            descricao: descricao || descricao.preco
        })
        return res.status(200).json(servicoAtualizado);
    },

    async excluirServico(req, res) {
        try {

            const { servico_id } = req.params;
            const servico = await Servico.findByPk(servico_id);

            if (!servico) {
                return res.status(400).json({ message: "Serviço não encontrado" });
            }

            await servico.update({ 
                ativo: false
            })
    
            return res.status(200).json({ message: "Serviço deletado"});
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: "Erro ao deletar serviço" });
        }
    }
};