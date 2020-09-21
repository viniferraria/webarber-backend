const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController');
const { TipoUsuario } = require('./app/models');

routes.get('/', (req, res) => {
    return res.status(200).json({
        hello: "world"
    });
});

routes.get('/tipos', async (req, res) => {
    let tipos = await TipoUsuario.findAll({
        order: [
            ['id', 'ASC']
        ]
    })
    res.json(tipos);
})


routes.post('/login', UserController.login)
routes.get('/users', UserController.getAll);
routes.get('/users/:user_id', UserController.get);
routes.post('/users', UserController.create);
routes.patch('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

module.exports = routes;