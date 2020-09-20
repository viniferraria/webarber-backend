const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        id: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        sobrenome: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        ativo: Datatypes.BOOLEAN,
        CNPJ: Datatypes.STRING,
        CPF: Datatypes.STRING,
        idTipo: DataTypes.INTEGER,
        icone: DataTypes.STRING.BINARY,
        sessionToken: Datatypes.STRING
    }, {
        hooks: {
            beforeSave: async user => {
                if (user.password) {
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        },
    });

    Usuario.associate = function (models) {
        // associations can be defined here
        Usuario.hasOne(models.TipoUsuario);
    };

    Usuario.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash);
    }
    
    // Usuario.prototype.generateToken = function() {
    //     return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    // }

    return Usuario;
};
