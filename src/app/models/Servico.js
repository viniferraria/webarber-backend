module.exports = (sequelize, DataTypes) => {
    const Servico = sequelize.define("Servico", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        preco: DataTypes.FLOAT,
        ativo: DataTypes.BOOLEAN,
        barbearia_id: DataTypes.INTEGER
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

    Servico.associate = function (models) {
            Servico.hasOne(models.Barbearia, {
            foreignKey: "id"
        });
    };

    return Servico;
};

