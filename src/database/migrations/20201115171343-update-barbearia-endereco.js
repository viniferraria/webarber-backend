"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Barbearia", "bairro", {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn("Barbearia", "cidade", {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn("Barbearia", "estado", {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Barbearia", "bairro");
    await queryInterface.removeColumn("Barbearia", "cidade");
    await queryInterface.removeColumn("Barbearia", "estado");
  }
};
