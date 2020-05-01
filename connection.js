const dotEnv = require('dotenv').config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        timezone: 'UTC',
        dateStrings: true
    },
    // debug: true
});

module.exports = knex;