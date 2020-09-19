'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Usuario", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: DataTypes.VIRTUAL,
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ativo: {
        type: Datatypes.BOOLEAN,
        allowNull: false
      },
      CNPJ: {
        type: Datatypes.STRING,
        unique: true,
      },
      CPF: {
        type: Datatypes.STRING,
        unique: true,
      },
      idTipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: TipoUsuario,
          key: 'idTipo'
        }
      },
      icone: DataTypes.STRING.BINARY
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuario');
  }
};