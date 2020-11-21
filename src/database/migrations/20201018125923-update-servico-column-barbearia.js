"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Servico", 
      "barbearia_id",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Barbearia",
          key: "id"
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Servico", "barbearia_id");
  }
};