'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuario', [{
      id: 1,
      nome: 'Dua',
      sobrenome: 'Lipa',
      email: 'Dua@gmail.com',
      password_hash: 'asdasdasd',
      ativo: true,
      CPF: '231.123.183-99',
      idTipo: 1
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuario', null, {});
  }
};
