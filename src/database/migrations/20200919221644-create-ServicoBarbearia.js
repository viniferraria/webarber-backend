'use strict';

const ServicoBarbearia = require('../../app/models/ServicoBarbearia');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ServicoBarbearia', ServicoBarbearia);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ServicoBarbearia');
    }
};