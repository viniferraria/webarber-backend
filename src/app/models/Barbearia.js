
module.exports = (sequelize, DataTypes) => {
    const Barbearia = sequelize.define('Barbearia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: DataTypes.STRING,
        endereco: DataTypes.STRING,
        telefone: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        icone: DataTypes.STRING.BINARY,
        horarioAbertura: DataTypes.DATE,
        horarioFechamento: DataTypes.DATE
    }, {
        timestamps: false
    });

    // Barbearia.associate = function (models) {
    //     // associations can be defined here
    //     Barbearia.hasOne(models.Agenda);
    //     Barbearia.belongsTo(models.Agendamentos);
    //     Barbearia.belongsTo(models.AvaliacaoUsuario);
        
    // };

    return Barbearia;
};
