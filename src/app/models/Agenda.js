const Barbearia = require("./Barbearia");
const ServicoBarbearia = require("./ServicoBarbearia");

module.exports = (sequelize, DataTypes) => {
    const Agenda = sequelize.define("Agenda", {
        idAgenda: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        horarios: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idBarbearia: {
            type: Datatypes.INTEGER,
            references: {
                model: Barbearia,
                key: 'idBarbearia'
            }
        },
        idServicoBarbearia: {
            type: Datatypes.INTEGER,
            references: {
                model: ServicoBarbearia,
                key: 'idServico'
            }
        },
    }, {
        updatedAt: false
    });

    return Agenda;
};
