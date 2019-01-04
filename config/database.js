const Sequelize = require('sequelize');

module.exports = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    port: 5432,
    dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});