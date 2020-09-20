require('dotenv').config();

module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'teste',
    password: process.env.DB_PASSWORD || 'teste',
    database: process.env.DB_NAME || 'db',
    define: {
        timestamps: true, 
        underscored: true
    }
};