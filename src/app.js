"use strict";

const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const helmet = require("helmet");
var jwt = require("express-jwt");


require("dotenv").config();
require("./database");

const app = express();

/* const unlessRoutes = [
    "/tiposconta/",
    "/tiposconta/",
    "/statusagendamento/",
    "/cadastro/",
    "/login/",
    "/barbearias/**",
    "/barbearias/:barbearia_id/",
    "/servicos/barbearia/:barbearia_id/",
    "/servicos/:servico_id/",
    "/avaliacoes/:barbearia_id/"
]; */

// Middlewares
app.use(helmet());
app.disable("x-powered-by");
app.use(cors());
app.options("*", cors());
// app.use(jwt({ secret: process.env.APP_SECRET, algorithms: ["HS256"]}).unless({path: unlessRoutes}));
app.use(express.json());
app.use(routes);

module.exports = app;