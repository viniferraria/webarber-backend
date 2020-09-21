module.exports = (sequelize, DataTypes) => {
    const StatusAgendamento = sequelize.define("StatusAgendamento", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nomeStatus: DataTypes.STRING,
    });

    // StatusAgendamento.associate = function (models) {
    //     // associations can be defined here
    //     StatusAgendamento.belongsTo(models.Agendamentos);
    // };

    return StatusAgendamento;
};
