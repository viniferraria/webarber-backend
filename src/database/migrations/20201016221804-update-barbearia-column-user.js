"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Barbearia", 
      "user_id",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "id"
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Barbearia", "user_id");
  }
};
