"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Servico", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            preco: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
        }, {
            timestamps: false,
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Servico");
    }
};