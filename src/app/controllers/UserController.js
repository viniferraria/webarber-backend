const { Usuario } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

function validaDocumento(documento) {
    return documento.match(/^(\d{3}\.?){2}(\d{3})-?(\d{2})$|^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/);
}

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
            const user = await Usuario.findOne({ where: { 
                id: req.userId
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
        try {
            let { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;
            if (!email)
                return res.status(400).json({ message: 'É necessário informar um email para criar uma conta' });
            

            if (idTipo == 1 && !CPF) {
                return res.status(400).json({ message: 'É necessário informar um CPF para criar uma conta' });
            }

            if (idTipo == 2 && !CNPJ) {
                return res.status(400).json({ message: 'É necessário informar um CNPJ para criar uma conta de moderador' });
            }

            if (!validaDocumento(CPF || CNPJ))
                return res.status(400).json({ message: 'Documento inválido' });

            CPF = (idTipo == 2)? null : CPF;
            CNPJ = (idTipo == 1)? null : CNPJ;
            
            const user = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { CPF: CPF || '' },
                        { CNPJ: CNPJ || '' }
                    ]
                }
            });
            
            if (user) {
                console.log("Duplicate fields");
                return res.status(400).json({ message: 'Erro ao criar uma conta'});
            }

            const newUser = await Usuario.create({ nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone });
            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao criar uma conta' });
        }

    },

    async update(req, res) {
        try {
            const { userId } = req;
            let { nome, sobrenome, email, password, CNPJ, CPF, idTipo, icone } = req.body;

            if (!email) {
                return res.status(400).json({ message: 'É necessário informar um email para criar uma conta' });
            } else if (idTipo == 1 && !CPF) {
                return res.status(400).json({ message: 'É necessário informar um CPF para criar uma conta' });
            } else if (idTipo == 2 && !CNPJ) {
                return res.status(400).json({ message: 'É necessário informar um CNPJ para criar uma conta de moderador' });
            } else if (!validaDocumento(CPF || CNPJ)) {
                return res.status(400).json({ message: 'Documento inválido' });
            }

            let user = await Usuario.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado'});
            }

            // TODO validar se o cpf, ou CPNJ ou email já estão associados a outro usuário
            const repetido = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { CPF: CPF || '' },
                        { CNPJ: CNPJ || '' }
                    ]
                }
            });

            if (repetido && repetido.id != userId)
                return res.status(400).json({ message: 'Erro ao atualizar documentos|email'});

            const updatedUser = await user.update({
                nome: nome || user.nome,
                sobrenome: sobrenome || user.sobrenome,
                email: email || user.email,
                password: password || user.password,
                CNPJ: (idTipo == 2)? (CNPJ || user.CNPJ) : null,
                CPF: (idTipo == 1)? (CPF|| user.CPF) : null,
                idTipo: idTipo || user.idTipo,
                icone: icone || user.icone,
            })

            delete updatedUser.password;

            return res.status(200).json(updatedUser);
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({ message: "Erro ao atualizar informações" });
        }
    },
    
    async delete(req, res) {
        try {
            const { userId } = req;
            const user = await Usuario.findByPk(userId);

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

            user.generateToken();
            await user.update({
                sessionToken: user.sessionToken
            });

            return res.status(200).json(user);
        } catch(err) {
            console.log(err);
            return res.status(404).json({ message: `Error`});
        }
    }
};