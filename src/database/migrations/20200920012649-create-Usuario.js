'use strict';

const Usuario = require('../../app/models/Usuario');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Usuario", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      CNPJ: {
        type: Sequelize.STRING,
        unique: true,
      },
      CPF: {
        type: Sequelize.STRING,
        unique: true,
      },
      idTipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'TipoUsuario',
          },
          key: 'idTipo'
        }
      },
      icone: Sequelize.STRING.BINARY
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuario');
  }
};