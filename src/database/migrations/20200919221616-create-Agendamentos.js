'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Agendamentos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            idBarbearia: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Barbearia',
                    key: 'id'
                }
            },
            idUsuario: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Usuario',
                    key: 'id'
                }
            },
            idStatus: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'StatusAgendamento',
                    key: 'id'
                }
            },
            idServico: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ServicoBarbearia',
                    key: 'id'
                }
            },
            idAgenda: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Agenda',
                    key: 'id'
                }
            },
            icone: Sequelize.STRING.BINARY
        }, {
            timestamps: false,
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Agendamentos');
    }
};