module.exports = (sequelize, DataTypes) => {
    const Agenda = sequelize.define("Agenda", {
        id: DataTypes.INTEGER,
        data: DataTypes.DATE,
        horarios: DataTypes.DATE,
        idBarbearia: Datatypes.INTEGER,
        idServicoBarbearia: Datatypes.INTEGER,
    });

    Agenda.associate = function (models) {
        Agenda.belongsTo(models.Barbearia);
        Agenda.hasMany(models.ServicoBarbearia);
        Agenda.hasMany(models.Agendamentos)
    };

    return Agenda;
};
