module.exports = (sequelize, DataTypes) => {
    const StatusAgendamento = sequelize.define("StatusAgendamento", {
        idStatus: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nomeStatus: DataTypes.STRING,
    });

    return StatusAgendamento;
};
