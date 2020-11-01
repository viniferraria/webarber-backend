'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn( 'Barbearia', 'complemento', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn( 'Barbearia', 'numero', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn( 'Barbearia', 'bloco', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn( 'Barbearia', 'cep', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Barbearia', 'complemento');
    await queryInterface.removeColumn('Barbearia', 'numero');
    await queryInterface.removeColumn('Barbearia', 'bloco');
    await queryInterface.removeColumn('Barbearia', 'cep');
  }
};