'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TipoUsuario', [
      {
        id: 1,
        nome: "Consumidor"
      },
      {
        id: 2,
        nome: "Moderador"
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TipoUsuario', null, {});
  }
};
