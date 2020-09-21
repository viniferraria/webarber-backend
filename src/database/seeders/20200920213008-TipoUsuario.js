'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TipoUsuario', [
      {
        id: 1,
        tipoDescricao: "Consumidor"
      },
      {
        id: 2,
        tipoDescricao: "Moderador"
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TipoUsuario', null, {});
  }
};
