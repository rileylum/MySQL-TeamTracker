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
};

async function getAll(table) {
    const db = await openDBConnection();
    queryString = `SELECT * FROM ${table}`
    const [result] = await db.query(queryString);
    db.end();
    return result;
};

async function addEmployee(input) {
    const db = await openDBConnection();
    queryString = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
};

async function addRole(input) {
    const db = await openDBConnection();
    queryString = `INSERT INTO role(title, salary, department_id)
                VALUES (?,?,?)`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
};

async function addDepartment(input) {
    const db = await openDBConnection();
    queryString = `INSERT INTO department(name)
                VALUES (?)`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
};

async function updateEmployeeRole(input) {
    const db = await openDBConnection();
    queryString = `UPDATE employee
                SET role_id = ?
                WHERE id = ?`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
};

module.exports.getAll = getAll;
module.exports.addEmployee = addEmployee;
module.exports.addRole = addRole;
module.exports.addDepartment = addDepartment;
module.exports.updateEmployeeRole = updateEmployeeRole;