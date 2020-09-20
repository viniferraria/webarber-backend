'use strict';

const Barbearia = require('../../app/models/Barbearia');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Barbearia", Barbearia);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Barbearia');
    }
};