require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: DataTypes.STRING,
        sobrenome: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        CNPJ: DataTypes.STRING,
        CPF: DataTypes.STRING,
        idTipo: DataTypes.INTEGER,
        icone: DataTypes.STRING.BINARY,
        sessionToken: DataTypes.STRING
    }, {
        hooks: {
            beforeSave: async user => {
                if (user.password) {
                    user.password_hash = await bcrypt.hash(user.password, 12);
                    delete user.password;
                }
            }
        },
    });

    Usuario.associate = function (models) {
        Usuario.hasOne(models.TipoUsuario, {
            foreignKey: 'id'
        });
    };

    Usuario.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash);
    }

    Usuario.prototype.generateToken = function() {
        this.sessionToken = jwt.sign({
            id: this.id, 
            idTipo: this.idTipo 
        }, process.env.APP_SECRET, { 
            algorithm: 'HS256',
            expiresIn: '1h'
        });
    }

    return Usuario;
};
