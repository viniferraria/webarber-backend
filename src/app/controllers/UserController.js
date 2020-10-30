const { Usuario } = require('../models');

module.exports = {

    async getAll(_, res) {
        try {
            const users = await Usuario.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
    
            if (!users) {
                return res.status(400).json({ message: 'No Users found'});
            }
    
            return res.status(200).json(users);
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: 'Error while fetching users' });
        }
    },

    async get(req, res) {
        try {
            const { user_id } = req.params;
            const user = await Usuario.findOne({ where: { 
                id: user_id
            }});
            
            if(!user) {
                return res.status(400).json({ message: 'User Not Found'});
            }
            
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error while fetching user' });
        }
    },

    async create(req, res) {
        try {
            let { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;
            const user = await Usuario.findOne({ where: { email: email }});
            
            if (user) {
                return res.status(400).json({ message: 'Error while creating new User'});
            }


        if (icone)
        icone = Buffer.from(icone, 'base64');

            const newUser = await Usuario.create({ nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone });
            return res.status(201).json(newUser);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'CPF is already registered'})
            } else {
                return res.status(400).json({ message: error });
            }
        }

    },

    async update(req, res) {
        const { user_id } = req.params;
        const { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;

        const user = await Usuario.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ message: 'User Not Found'});
        }

        if (icone)
            icone = Buffer.from(icone, 'base64');

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
        try {

            const { user_id } = req.params;
            const user = await Usuario.findByPk(user_id);

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            await user.update({ 
                ativo: false
            })
    
            return res.status(200).json({ message: "User deleted"});
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: 'Error while deleting user' });
        }

    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await Usuario.findOne({ where: { email } });
            
            if (!user)
                return res.status(401).json({ message: 'User not found' });
            
            if (!(await user.checkPassword(password))) 
                return res.status(400).json({ message: 'Credenciais inválidas' });
                
            if (!user.ativo)
                return res.status(400).json({ message: 'Credenciais inválidas' });
            
            return res.status(200).json(user);
        } catch(err) {
            console.log(err);
            return res.status(404).json({ message: `Error`});
        }
    }
};