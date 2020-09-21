const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers');

routes.get('/', (req, res) => {
    return res.status(200).json({
        hello: "world"
    });
});

routes.get('/users', UserController.get);
routes.post('/users', UserController.create);
routes.patch('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

module.exports = routes;