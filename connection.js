const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'admin',
        password: 'nopass',
        database: 'calendar_bali',
        timezone: 'UTC',
        dateStrings: true
    },
    // debug: true
});

module.exports = knex;