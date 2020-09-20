module.exports = (sequelize, DataTypes) => {
    const StatusAgendamento = sequelize.define("StatusAgendamento", {
        id: DataTypes.INTEGER,
        nomeStatus: DataTypes.STRING,
    });

    return StatusAgendamento;
};
