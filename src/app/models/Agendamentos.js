module.exports = (sequelize, DataTypes) => {
    const Agendamentos = sequelize.define('Agendamentos', {
        id: DataTypes.INTEGER,
        idBarbearia: DataTypes.INTEGER,
        idUsuario: DataTypes.INTEGER,
        idStatus: DataTypes.INTEGER,
        idServico: DataTypes.INTEGER,
        idAgenda: DataTypes.INTEGER,
        icone: DataTypes.STRING.BINARY
    });

    Agendamentos.associate = function (models) {
        Agendamentos.belongsTo(models.Agenda);
        Agendamentos.hasOne(models.Barbearia);
        Agendamentos.hasOne(models.Usuario);
        Agendamentos.hasOne(models.StatusAgendamento);
        Agendamentos.hasOne(models.ServicoBarbearia);
    };


    return Agendamentos;
};
