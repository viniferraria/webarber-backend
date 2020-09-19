module.exports = (sequelize, DataTypes) => {
    const ServicoBarbearia = sequelize.define("ServicoBarbearia", {
        idServicoBarbearia: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preco: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return ServicoBarbearia;
};

