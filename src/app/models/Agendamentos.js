module.exports = (sequelize, DataTypes) => {
    const Agendamentos = sequelize.define('Agendamentos', {
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
        idAgenda: DataTypes.INTEGER,
        icone: DataTypes.STRING.BINARY
    }, {
        freezeTableName: true,
        timestamps: false
    });

    // Agendamentos.associate = function (models) {
    //     Agendamentos.belongsTo(models.Agenda);
        // Agendamentos.hasOne(models.Barbearia);
        // Agendamentos.hasOne(models.Usuario);
        // Agendamentos.hasOne(models.StatusAgendamento);
        // Agendamentos.hasOne(models.ServicoBarbearia);
    // };


    return Agendamentos;
};
