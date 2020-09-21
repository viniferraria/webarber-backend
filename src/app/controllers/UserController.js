const { Usuario } = require('../models');

module.exports = {

    async getAll(req, res) {
        const user = await Usuario.findAll({
            order: [
                ['id', 'ASC']
            ]
        })

        if(!user) {
            return res.status(400).json({ error: 'No Users Found'});
        }

        return res.status(200).json(user);
    },

    async get(req, res) {
        const { user_id } = req.params;
        // const { email, password} = req.body;

        const user = await Usuario.findOne({ where: { 
            id: user_id
        }});

        if(!user) {
            return res.status(400).json({ error: 'User Not Found'});
        }

        return res.status(200).json(user);
    },

    async create(req, res) {
        const { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;
        console.log(req.body);
        const user = await Usuario.findOne({ where: { email: email }});
        
        if (user) {
            return res.status(400).json({ error: 'Error while creating new User'});
        }
        try {
            const newUser = await Usuario.create({ nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone });
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ error: err });
        }

    },

    async update(req, res) {
        const { user_id } = req.params;
        const { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;

        const user = await Usuario.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User Not Found'});
        }

        const updatedUser = await user.update({
            nome: nome || user.nome,
            sobrenome: sobrenome || user.sobrenome,
            email: email || user.email,
            password: password || user.password,
            CNPJ: CNPJ || user.CNPJ,
            CPF: CPF || user.CPF,
            idTipo: idTipo || user.idTipo,
            icone: icone || user.icone,
        })

        return res.status(200).json(updatedUser);
    },

    async delete(req, res) {
        const { user_id } = req.params;
        const user = await Usuario.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        await user.update({ 
            ativo: false
        })

        // await Usuario.destroy({ where: {
        //     id: user_id
        // }})

        return res.status(200).json({ message: "User deleted"});
    },

    async login(req, res) {
        const { email, password } = req.params;
        const user = await Usuario.findOne({ where: email });

        try {
            let equals = user.checkPassword(password);
            if (equals) {
                return res.status(200).json({  message: 'Login!' });
            } else {
                throw new Error('Wrong password');
            }
        } catch (err) {
            res.status(400).json({ message: 'Wrong password' });
        }


    }
};