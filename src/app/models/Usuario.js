const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TipoUsuario = require('./TipoUsuario');

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sobrenome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: DataTypes.VIRTUAL,
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ativo: {
            type: Datatypes.BOOLEAN,
            allowNull: false
        },
        CNPJ: {
            type: Datatypes.STRING,
            unique: true,
        },
        CPF: {
            type: Datatypes.STRING,
            unique: true,
        },
        idTipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
