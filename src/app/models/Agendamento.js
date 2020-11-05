module.exports = (sequelize, DataTypes) => {
    const Agendamento = sequelize.define('Agendamento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idBarbearia: DataTypes.INTEGER,
        idUsuario: DataTypes.INTEGER,
        idStatus: DataTypes.INTEGER,
        idServico: DataTypes.INTEGER,
        data: DataTypes.DATE
    }, {
        timestamps: false
    });

    Agendamento.associate = function (models) {
        Agendamento.hasOne(models.Barbearia, { foreignKey: 'id'});
        Agendamento.hasOne(models.Usuario, { foreignKey: 'id'});
        Agendamento.hasOne(models.StatusAgendamento, { foreignKey: 'id'});
        Agendamento.hasOne(models.Servico, { foreignKey: 'id'});
    };


    return Agendamento;
};
