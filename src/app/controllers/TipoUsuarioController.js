const { TipoUsuario, sequelize } = require('../models');

module.exports = {


    async getAll(req, res) {
        let tipos = await TipoUsuario.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
        res.json(tipos);
    }

}