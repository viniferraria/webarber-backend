'use strict';

const Agendamento = require('../../app/models/Agendamentos');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Agendamento', Agendamento);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Agendamento');
    }
};