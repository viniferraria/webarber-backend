module.exports = (sequelize, DataTypes) => {
    const StatusAgendamento = sequelize.define("StatusAgendamento", {
        idStatus: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nomeStatus: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return StatusAgendamento;
};
