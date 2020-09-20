const Barbearia = require("./Barbearia");
const Usuario = require("./Usuario");

module.exports = (sequelize, DataTypes) => {
    const AvaliacaoUsuario = sequelize.define("AvaliacaoUsuario", {
        id: DataTypes.INTEGER,
        idUsuario: DataTypes.INTEGER,
        idBarbearia: DataTypes.INTEGER,
        nota: DataTypes.FLOAT
    });

    return AvaliacaoUsuario;
};
