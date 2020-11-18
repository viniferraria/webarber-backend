const { TipoUsuario } = require("../models");

module.exports = {

    async obterTiposUsuario(_, res) {
        try {
            let tipos = await TipoUsuario.findAll({
                order: [
                    ["id", "ASC"]
                ]
            })
            return res.status(200).json(tipos);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error while fetching" });
        }
    }

}