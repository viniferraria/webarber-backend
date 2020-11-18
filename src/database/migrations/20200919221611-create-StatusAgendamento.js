"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("StatusAgendamento", {
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
        await queryInterface.bulkInsert("StatusAgendamento", [
            {
                id: 1,
                nome: "Agendado"
            },
            {
                id: 2,
                nome: "Andamento"
            },
            {
                id: 3,
                nome: "Concluído"
            },
            {
                id: 4,
                nome: "Cancelado"
            }]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("StatusAgendamento");
    }
};