const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "webinter",
    password: "22B1NUM2341",
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;
