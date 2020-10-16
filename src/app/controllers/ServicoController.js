const { Servico } = require('../models');

module.exports = {

    async getAll(_, res) {
        try {
            const servicos = await Servico.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
    
            if (!servicos) {
                return res.status(400).json({ message: 'Nenhum serviço encontrado'});
            }
    
            return res.status(200).json(servicos);
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar serviços' });
        }
    },

    async get(req, res) {
        try {
            const { servico_id } = req.params;
            const servico = await Servico.findOne({ where: { 
                id: servico_id
            }});
            
            if(!servico) {
                return res.status(400).json({ message: 'Serviço não encontrado'});
            }
            
            return res.status(200).json(servico);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar serviço' });
        }
    },

    async create(req, res) {
        try {
            const { titulo, preco } = req.body;
            const servico = await Servico.findOne({ where: { titulo: titulo }});
            
            if (servico) {
                return res.status(400).json({ message: 'Já existe um serviço com este nome'});
            }

            const novoServico = await Servico.create({ titulo, preco });
            return res.status(201).json(novoServico);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao criar um serviço' });
        }

    },

    async update(req, res) {
        const { servico_id } = req.params;
        const { titulo, preco } = req.body;

        const servico = await Servico.findByPk(servico_id);

        if (!servico) {
            return res.status(400).json({ message: 'Serviço não encontrado'});
        }

        const servicoAtualizado = await servico.update({
            titulo: titulo || servico.titulo,
            preco: preco || servico.preco
        })

        return res.status(200).json(servicoAtualizado);
    },

    async delete(req, res) {
        try {

            const { servico_id } = req.params;
            const servico = await Servico.findByPk(servico_id);

            if (!servico) {
                return res.status(400).json({ message: 'Serviço não encontrado' });
            }

            await servico.update({ 
                ativo: false
            })
    
            return res.status(200).json({ message: "Serviço deletado"});
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao deletar serviço' });
        }

    }
};