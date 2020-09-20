module.exports = (sequelize, DataTypes) => {
    const StatusAgendamento = sequelize.define("StatusAgendamento", {
        id: DataTypes.INTEGER,
        nomeStatus: DataTypes.STRING,
    });

    StatusAgendamento.associate = function (models) {
        // associations can be defined here
        StatusAgendamento.belongsTo(models.Agendamentos);
    };

    return StatusAgendamento;
};
