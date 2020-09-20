'use strict';

const TipoUsuario = require('../../app/models/TipoUsuario');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("TipoUsuario", TipoUsuario);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TipoUsuario');
    }
};