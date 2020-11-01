
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
        user_id: DataTypes.INTEGER,
        horarioAbertura: DataTypes.DATE,
        horarioFechamento: DataTypes.DATE,
        complemento: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        bloco: DataTypes.STRING,
        cep: DataTypes.STRING,
    }, {
        timestamps: true
    });

    Barbearia.associate = function (models) {
        // associations can be defined here
        // Barbearia.hasOne(models.Agenda);
        // Barbearia.belongsTo(models.Agendamentos);
        // Barbearia.belongsTo(models.AvaliacaoUsuario);

        Barbearia.hasOne(models.Usuario, {
            foreignKey: 'id'
        });
    };

    return Barbearia;
};
