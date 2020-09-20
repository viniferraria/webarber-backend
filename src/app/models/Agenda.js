module.exports = (sequelize, DataTypes) => {
    const Agenda = sequelize.define("Agenda", {
        id: DataTypes.INTEGER,
        data: DataTypes.DATE,
        horarios: DataTypes.DATE,
        idBarbearia: Datatypes.INTEGER,
        idServicoBarbearia: Datatypes.INTEGER,
    });

    return Agenda;
};
