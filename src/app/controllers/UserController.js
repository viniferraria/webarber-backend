const { Usuario } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

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
            
            if (!user) {
                return res.status(400).json({ message: 'User Not Found'});
            }
            
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error while fetching user' });
        }
    },

    async create(req, res) {
        function validaDocumento(documento) {
            return documento.match(/^(\d{3}\.?){2}(\d{3})-?(\d{2})$|^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/);
        }

        try {
            const { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;
            const user = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { CPF },
                        { CNPJ }
                    ]
                }
            });
            
            if (user) {
                console.log("Duplicate fields");
                return res.status(400).json({ message: 'Error while creating new User'});
            }

            if (idTipo == 1 && !CPF && CNPJ) {
                console.log(CNPJ? "passou CNPJ e não CPF" : "não passo CPF");
                return res.status(400).json({ message: 'É necessário informar um CPF para criar uma conta' });
            }

            if (idTipo == 2 && !CPF) {
                console.log(CPF? "passou CPF e não CNPJ" : "não passo CNPJ");
                return res.status(400).json({ message: 'É necessário informar um CPF para criar uma conta' });
            }

            if (!validaDocumento(CPF || CNPJ))
                return res.status(400).json({ message: 'Documento inválido' });

            const newUser = await Usuario.create({ nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone });
            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }

    },

    async update(req, res) {
        try {
            const { user_id } = req.params;
            const { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;
            const user = await Usuario.findByPk(user_id);    
            
            if (!user) {
                return res.status(400).json({ message: 'User Not Found'});
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
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({message: "Erro ao atualizar informações"});
        }
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