"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Barbearia", "diaFuncionamento", {
      type: Sequelize.ARRAY(Sequelize.ENUM([
        "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"
      ])),
      allowNull: false,
      validate: {
        validaTamanho(valor) {
          if (valor.length === 0 || valor.length > 7) {
            throw new Error("Só é possível especificar os dias da semana");
          }
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Barbearia", "diaFuncionamento");
    await queryInterface.sequelize.query("DROP TYPE \"enum_Barbearia_diaFuncionamento\";");
  }
};
