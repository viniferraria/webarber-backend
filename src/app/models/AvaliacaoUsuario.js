const Barbearia = require("./Barbearia");
const Usuario = require("./Usuario");

module.exports = (sequelize, DataTypes) => {
    const AvaliacaoUsuario = sequelize.define("AvaliacaoUsuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idUsuario: DataTypes.INTEGER,
        idBarbearia: DataTypes.INTEGER,
        nota: DataTypes.FLOAT
    }, {
        timestamps: false
    });

    // AvaliacaoUsuario.associate = function (models) {
        // AvaliacaoUsuario.hasOne(models.Usuario);
    //     AvaliacaoUsuario.hasOne(models.Barbearia);
    // };

    return AvaliacaoUsuario;
};
