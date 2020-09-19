const Agenda = require("./Agenda");

module.exports = (sequelize, DataTypes) => {
    const Barbearia = sequelize.define("Barbearia", {
        idBarbearia: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nomeBarbearia: DataTypes.STRING,
        endereco: DataTypes.STRING,
        telefone: DataTypes.STRING,
        ativo: Datatypes.BOOLEAN,
        icone: DataTypes.STRING.BINARY,
        mediaNota: DataTypes.FLOAT,
        horarioAbertura: DataTypes.DATE,
        horarioFechamento: DataTypes.DATE,
        idAgenda: {
            type: Datatypes.INTEGER,
            references: {
                model: Agenda,
                key: 'idAgenda'
            }
        }
    });

    return Barbearia;
};
