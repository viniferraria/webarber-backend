module.exports = (sequelize, DataTypes) => {
    const Agenda = sequelize.define("Agenda", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        data: DataTypes.DATE,
        horarios: DataTypes.DATE,
        idBarbearia: DataTypes.INTEGER,
        idServicoBarbearia: DataTypes.INTEGER,
    });

    // Agenda.associate = function (models) {
        // Agenda.belongsTo(models.Barbearia);
        // Agenda.hasMany(models.ServicoBarbearia);
        // Agenda.hasMany(models.Agendamentos)
    // };

    return Agenda;
};
