const Barbearia = require("./Barbearia");
const Usuario = require("./Usuario");

module.exports = (sequelize, DataTypes) => {
    const AvaliacaoUsuario = sequelize.define("AvaliacaoUsuario", {
        idAvaliacao: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        },
        idBarbearia: {
            type: DataTypes.INTEGER,
            references: {
                model: Barbearia,
                key: 'idBarbearia'
            }
        },
        nota: DataTypes.FLOAT
    });

    return AvaliacaoUsuario;
};
