'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Barbearia', 'idAgenda', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Agenda',
                    key: 'id'
                }
        });
        await queryInterface.addColumn('Agenda', 'idBarbearia', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Barbearia',
                key: 'id'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'Barbearia',
            'idAgenda'
        );
        await queryInterface.removeColumn(
            'Agenda',
            'idBarbearia'
        );
    }
};