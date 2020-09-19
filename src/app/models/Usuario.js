const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TipoUsuario = require('./TipoUsuario');

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nome: DataTypes.STRING,
        sobrenome: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        ativo: Datatypes.BOOLEAN,
        CNPJ: {
            type: Datatypes.STRING,
            unique: true
        },
        CPF: {
            type: Datatypes.STRING,
            unique: true
        },
        idTipo: {
            type: DataTypes.INTEGER,
            references: {
                model: TipoUsuario,
                key: 'idTipo'
            }
        },
        icone: DataTypes.STRING.BINARY
    }, {
        hooks: {
            beforeSave: async user => {
                if (user.password) {
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    });

    Usuario.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash);
    }
    
    // Usuario.prototype.generateToken = function() {
    //     return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    // }

    return Usuario;
};
