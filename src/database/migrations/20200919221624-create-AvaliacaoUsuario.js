'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('AvaliacaoUsuario', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            idUsuario: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Usuario',
                    key: 'id'
                }
            },
            idBarbearia: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Barbearia',
                    key: 'id'
                }
            },
            nota: Sequelize.FLOAT
        }, {
            timestamps: false,
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('AvaliacaoUsuario');
    }
};