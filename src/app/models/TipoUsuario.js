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
        timestamps: false
    });

    return TipoUsuario;
};
