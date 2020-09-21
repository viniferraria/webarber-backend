'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Agenda', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false
            },
            horarios: {
                type: Sequelize.DATE,
                allowNull: false
            },
            // idBarbearia: {
                // type: Sequelize.INTEGER,
                // references: {
                //     model: 'Barbearia',
                //     key: 'id'
                // }
            // },
            idServicoBarbearia: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ServicoBarbearia',
                    key: 'id'
                }
            },
        }, {
            updatedAt: false,
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Agenda');
    }
};