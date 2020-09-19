'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("TipoUsuario", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            tipoDescricao: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            timestamps: false
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TipoUsuario');
    }
};