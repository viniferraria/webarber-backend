module.exports = (sequelize, DataTypes) => {
    const Servico = sequelize.define("Servico", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        titulo: DataTypes.STRING,
        preco: DataTypes.FLOAT,
        ativo: DataTypes.BOOLEAN
    }, {
        freezeTableName: true,
        timestamps: false
    }, {
        timestamps: false
    });

    // ServicoBarbearia.associate = function (models) {
    //     // associations can be defined here
    //     ServicoBarbearia.belongsTo(models.Agendamentos);
    //     ServicoBarbearia.belongsTo(models.ServicoBarbearia);
    // };

    return Servico;
};

