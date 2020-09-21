module.exports = (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define("TipoUsuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tipoDescricao: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return TipoUsuario;
};
