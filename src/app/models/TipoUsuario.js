module.exports = (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define("TipoUsuario", {
        id: DataTypes.INTEGER,
        tipoDescricao: DataTypes.STRING,
    });

    return TipoUsuario;
};
