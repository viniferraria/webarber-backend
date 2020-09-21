
module.exports = (sequelize, DataTypes) => {
    const Barbearia = sequelize.define('Barbearia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nomeBarbearia: DataTypes.STRING,
        endereco: DataTypes.STRING,
        telefone: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        icone: DataTypes.STRING.BINARY,
        mediaNota: DataTypes.FLOAT,
        horarioAbertura: DataTypes.DATE,
        horarioFechamento: DataTypes.DATE,
        idAgenda: DataTypes.INTEGER,
    });

    // Barbearia.associate = function (models) {
    //     // associations can be defined here
    //     Barbearia.hasOne(models.Agenda);
    //     Barbearia.belongsTo(models.Agendamentos);
    //     Barbearia.belongsTo(models.AvaliacaoUsuario);
        
    // };

    return Barbearia;
};
