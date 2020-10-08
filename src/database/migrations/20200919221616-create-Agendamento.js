'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Agendamento', {
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
                    model: 'Servico',
                    key: 'id'
                }
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false
            }
        }, {
            timestamps: false,
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Agendamento');
    }
};