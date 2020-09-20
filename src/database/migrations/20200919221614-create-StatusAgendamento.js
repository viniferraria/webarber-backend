'use strict';

const StatusAgendamento = require('../../app/models/StatusAgendamento');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('StatusAgendamento', StatusAgendamento);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('StatusAgendamento');
    }
};