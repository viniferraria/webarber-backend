module.exports = (sequelize, DataTypes) => {
    const ServicoBarbearia = sequelize.define("ServicoBarbearia", {
        idServicoBarbearia: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        titulo: DataTypes.STRING,
        preco: DataTypes.STRING,
    });

    return ServicoBarbearia;
};

