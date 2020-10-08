'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TipoUsuario', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
        }, {
            timestamps: false,
            freezeTableName: true
        });
        await queryInterface.bulkInsert('TipoUsuario', [
            {
                id: 1,
                nome: "Consumidor"
            },
            {
                id: 2,
                nome: "Moderador"
            }]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TipoUsuario');
    }
};