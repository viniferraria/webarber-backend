"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Avaliacao", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descricao: {
              type: Sequelize.STRING,
              allowNull: false
            },
            nota: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            idUsuario: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Usuario",
                    key: "id"
                }
            },
            idBarbearia: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Barbearia",
                    key: "id"
                }
            },
            idServico: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Servico",
                    key: "id"
                }
            },
            idAgendamento: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Agendamento",
                    key: "id"
                }
            }
        }, {
            timestamps: false,
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Avaliacao");
    }
};