module.exports = (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define("TipoUsuario", {
        id: DataTypes.INTEGER,
        tipoDescricao: DataTypes.STRING,
    });

    TipoUsuario.associate = function (models) {
        // associations can be defined here
        TipoUsuario.belongsTo(models.Usuario);
    };

    return TipoUsuario;
};
