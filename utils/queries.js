const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

async function openDBConnection() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });
    return db;
}

async function getAll(table) {
    const db = await openDBConnection();
    queryString = `SELECT * FROM ${table}`
    const [result] = await db.query(queryString);
    db.end();
    return result;
}

module.exports.getAll = getAll;