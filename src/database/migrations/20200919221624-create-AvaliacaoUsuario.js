'use strict';

const AvaliacaoUsuario = require('../../app/models/AvaliacaoUsuario');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', AvaliacaoUsuario);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('AvaliacaoUsuario');
    }
};