'use strict';

const Usuario = require('../../app/models/Usuario');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Usuario", Usuario);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuario');
  }
};