'use strict';

const Agenda = require('../../app/models/Agenda');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Agenda', Agenda);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Agenda');
    }
};