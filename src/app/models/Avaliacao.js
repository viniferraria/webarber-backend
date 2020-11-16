module.exports = (sequelize, DataTypes) => {
    const Avaliacao = sequelize.define("Avaliacao", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        nota: DataTypes.FLOAT,
        idUsuario: DataTypes.INTEGER,
        idBarbearia: DataTypes.INTEGER,
        idServico: DataTypes.INTEGER,
        idAgendamento: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false
    }, {
        timestamps: false
    });

    Avaliacao.associate = function (models) {
        Avaliacao.belongsTo(models.Barbearia, { foreignKey: 'idBarbearia', as: 'barbearia' });
        Avaliacao.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
        Avaliacao.belongsTo(models.Agendamento, { foreignKey: 'idAgendamento', as: 'agendamento' });
        Avaliacao.belongsTo(models.Servico, { foreignKey: 'idServico', as: 'servico' });
    };

    return Avaliacao;
};

