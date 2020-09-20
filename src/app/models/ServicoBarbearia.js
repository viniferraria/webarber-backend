module.exports = (sequelize, DataTypes) => {
    const ServicoBarbearia = sequelize.define("ServicoBarbearia", {
        id: DataTypes.INTEGER,
        titulo: DataTypes.STRING,
        preco: DataTypes.STRING,
    });

    return ServicoBarbearia;
};

