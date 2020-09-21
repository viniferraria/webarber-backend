module.exports = (sequelize, DataTypes) => {
    const TipoUsuario = sequelize.define("TipoUsuario", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tipoDescricao: DataTypes.STRING,
    });

    TipoUsuario.associate = function (models) {
        // associations can be defined here
        TipoUsuario.belongsTo(models.Usuario);
    };

    return TipoUsuario;
};
