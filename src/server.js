const express = require('express');
const routes = require('./routes')
const cors = require('cors')

require('dotenv').config();
require('./database');

const app = express();

app.use(cors());
app.option('*', cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;
