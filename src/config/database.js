require("dotenv").config();

module.exports = {
    dialect: process.env.DB_DIALECT || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "webarber",
    password: process.env.DB_PASSWORD || "webarber",
    database: process.env.DB_NAME || "webarber",
    define: {
        timestamps: true, 
        underscored: false,
        freezeTableName: true
    },
    dialectOptions: {
        useUTC: false 
    },
    timezone: "-03:00"
};
