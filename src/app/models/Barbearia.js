module.exports = (sequelize, DataTypes) => {
    const enumDiaFuncionamento = DataTypes.ENUM([
        "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"
    ]);

    const Barbearia = sequelize.define("Barbearia", {
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
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING,
        diaFuncionamento: DataTypes.ARRAY(enumDiaFuncionamento)
    }, {
        timestamps: true
    });

    Barbearia.associate = function (models) {

        Barbearia.hasOne(models.Usuario, {
            foreignKey: "id"
        });
    };

    return Barbearia;
};
