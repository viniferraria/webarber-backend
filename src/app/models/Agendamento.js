module.exports = (sequelize, DataTypes) => {
    const Agendamento = sequelize.define("Agendamento", {
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
        Agendamento.belongsTo(models.Barbearia, { foreignKey: "idBarbearia", as: "barbearia" });
        Agendamento.belongsTo(models.Usuario, { foreignKey: "idUsuario", as: "usuario" });
        Agendamento.belongsTo(models.StatusAgendamento, { foreignKey: "idStatus", as: "status" });
        Agendamento.belongsTo(models.Servico, { foreignKey: "idServico", as: "servico" });
    };
    return Agendamento;
};
