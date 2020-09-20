const Agenda = require("./Agenda");
const Barbearia = require("./Barbearia");
const ServicoBarbearia = require("./ServicoBarbearia");
const StatusAgendamento = require("./StatusAgendamento");
const Usuario = require("./Usuario");

module.exports = (sequelize, DataTypes) => {
    const Agendamentos = sequelize.define("Agendamentos", {
        idAgendamento: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idBarbearia: {
            type: DataTypes.INTEGER,
            references: {
                model: Barbearia,
                key: 'idBarbearia'
            }
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'idUsuario'
            }
        },
        idStatus: {
            type: DataTypes.INTEGER,
            references: {
                model: StatusAgendamento,
                key: 'idStatus'
            }
        },
        idServico: {
            type: DataTypes.INTEGER,
            references: {
                model: ServicoBarbearia,
                key: 'idTServicoBarbearia'
            }
        },
        idAgenda: {
            type: DataTypes.INTEGER,
            references: {
                model: Agenda,
                key: 'idAgenda'
            }
        },
        icone: DataTypes.STRING.BINARY
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Agendamentos;
};
