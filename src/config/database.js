require('dotenv').config();

module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'docker',
    password: process.env.DB_PASSWORD || 'docker',
    database: process.env.DB_NAME || 'nodeauth',
    define: {
        timestamps: true, 
        underscored: false,
        freezeTableName: true
    }
};
