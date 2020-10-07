const { Usuario, sequelize } = require('../models');

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

        try {
            const user = await Usuario.findOne({ where: { email: email }});
            
            if (user) {
                return res.status(400).json({ error: 'Error while creating new User'});
            }

            const newUser = await Usuario.create({ nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone });
            res.status(201).json(newUser);
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ error: 'CPF is already registered'})
            } else {
                res.status(400).json({ error: err });
            }
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
        const { email, password } = req.body;
        try {
            const user = await Usuario.findOne({ where: { email } });
            // Usuario.findOne({ where: { email: email }})
            
            if(!user)
                res.status(401).json({ message: 'User not found' });
            
            if (!(await user.checkPassword(password))) 
                return res.status(400).json({ message: 'Incorrect password' });
            
            return res.status(200).json({ message: 'Login!' });
        } catch(err) {
            console.log(err);
            res.status(404).json({ message: `Error`});
        }
    }
};