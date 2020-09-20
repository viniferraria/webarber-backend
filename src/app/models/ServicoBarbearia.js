module.exports = (sequelize, DataTypes) => {
    const ServicoBarbearia = sequelize.define("ServicoBarbearia", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
        timestamps: false,
        freezeTableName: true
    });

    return ServicoBarbearia;
};

