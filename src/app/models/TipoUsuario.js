module.exports = (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define("TipoUsuario", {
        idTipo: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tipoDescricao: DataTypes.STRING,
    });

    return TipoUsuario;
};
