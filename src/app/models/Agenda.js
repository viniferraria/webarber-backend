const Barbearia = require("./Barbearia");
const ServicoBarbearia = require("./ServicoBarbearia");

module.exports = (sequelize, DataTypes) => {
    const Agenda = sequelize.define("Agenda", {
        idAgenda: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        data: DataTypes.DATE,
        horarios: DataTypes.DATE,
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
    });

    return Agenda;
};
