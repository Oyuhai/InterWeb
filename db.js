const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'interweb',
    password: '123',
    port: 5432,
});

module.exports = pool;