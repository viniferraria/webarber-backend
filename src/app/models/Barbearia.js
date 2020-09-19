const Agenda = require("./Agenda");

module.exports = (sequelize, DataTypes) => {
    const Barbearia = sequelize.define("Barbearia", {
        idBarbearia: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nomeBarbearia: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ativo: {
            type: Datatypes.BOOLEAN,
            allowNull: false
        },
        icone: DataTypes.STRING.BINARY,
        mediaNota: DataTypes.FLOAT,
        horarioAbertura: {
            type: DataTypes.DATE,
            allowNull: false
        },
        horarioFechamento: {
            type: DataTypes.DATE,
            allowNull: false
        },
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
