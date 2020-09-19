module.exports = (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define("TipoUsuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tipoDescricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return TipoUsuario;
};
