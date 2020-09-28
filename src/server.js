'use strict'

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const helmet = require('helmet');


require('dotenv').config();
require('./database');

const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;
