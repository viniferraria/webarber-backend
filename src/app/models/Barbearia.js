
module.exports = (sequelize, DataTypes) => {
    const Barbearia = sequelize.define('Barbearia', {
        id: DataTypes.INTEGER,
        nomeBarbearia: DataTypes.STRING,
        endereco: DataTypes.STRING,
        telefone: DataTypes.STRING,
        ativo: Datatypes.BOOLEAN,
        icone: DataTypes.STRING.BINARY,
        mediaNota: DataTypes.FLOAT,
        horarioAbertura: DataTypes.DATE,
        horarioFechamento: DataTypes.DATE,
        idAgenda: Datatypes.INTEGER,
    });

    Barbearia.associate = function (models) {
        // associations can be defined here
        Barbearia.hasOne(models.Agenda);
        Barbearia.belongsToMany(models.Agendamentos);
        Barbearia.belongsToMany(models.AvaliacaoUsuario);
        
    };

    return Barbearia;
};
