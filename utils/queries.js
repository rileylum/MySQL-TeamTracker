const mysql = require('mysql2/promise');
const path = require('path');
envPath = path.join('__dirname', '../.env');
require('dotenv').config({ path: envPath });

async function openDBConnection() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });
    return db;
};

async function getAllEmployees() {
    const db = await openDBConnection();
    queryString = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
                department.name AS deparment, role.salary, CONCAT(m.first_name, " ",  m.last_name) AS manager 
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department on role.department_id = department.id
                LEFT JOIN employee m ON m.id = employee.manager_id
                ORDER BY employee.id`
    const [result] = await db.query(queryString);
    db.end();
    return result;
};

async function getAllRoles() {
    const db = await openDBConnection();
    queryString = `SELECT role.id, role.title, role.salary, department.name AS department
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id
                 ORDER BY role.id`
    const [result] = await db.query(queryString);
    db.end();
    return result;
};

async function getAllDepartments() {
    const db = await openDBConnection();
    queryString = `SELECT id, name FROM department ORDER BY department.id`
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

async function getAllCurrentManagers() {
    const db = await openDBConnection();
    queryString = `SELECT manager_id FROM employee
                WHERE manager_id IS NOT NULL
                GROUP BY manager_id`;
    const [managers] = await db.query(queryString);
    queryString2 = `SELECT id, first_name, last_name FROM employee
                    WHERE id IN (?)`;
    managerArr = managers.map(manager => manager.manager_id);
    const [result] = await db.query(queryString2, [managerArr]);
    db.end();
    return result;
}

async function getEmployeesByManager(input) {
    const db = await openDBConnection();
    queryString = `SELECT employee.id, employee.first_name, employee.last_name, 
                role.title AS role, department.name AS deparment, role.salary 
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department on role.department_id = department.id
                WHERE employee.manager_id = (?)
                `;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
}

async function updateEmployeeRole(input) {
    const db = await openDBConnection();
    queryString = `UPDATE employee
                SET role_id = ?
                WHERE id = ?`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
};

async function updateEmployeeManager(input) {
    const db = await openDBConnection();
    queryString = `UPDATE employee
                SET manager_id = ?
                WHERE id = ?`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
}

async function getEmployeesByDepartment(input) {
    const db = await openDBConnection();
    queryString = `SELECT employee.id, employee.first_name, employee.last_name, 
                role.title AS role, role.salary 
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department on role.department_id = department.id
                WHERE role.department_id = (?)
                `;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
}

async function getDepartmentUtilizedBudget(input) {
    const db = await openDBConnection();
    queryString = `SELECT department.name AS Department, 
            SUM(role.salary) AS Total_Utilized_Budget
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department on role.department_id = department.id
            WHERE role.department_id = (?)`
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
}

async function deleteEmployee(input) {
    const db = await openDBConnection();
    queryString = `DELETE FROM employee WHERE id = (?)`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
}

async function deleteRole(input) {
    const db = await openDBConnection();
    queryString = `DELETE FROM role WHERE id = (?)`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
}

async function deleteDepartment(input) {
    const db = await openDBConnection();
    queryString = `DELETE FROM department WHERE id = (?)`;
    const [result] = await db.query(queryString, input);
    db.end();
    return result;
}

module.exports.getAllEmployees = getAllEmployees;
module.exports.getAllRoles = getAllRoles;
module.exports.getAllDepartments = getAllDepartments;
module.exports.addEmployee = addEmployee;
module.exports.addRole = addRole;
module.exports.addDepartment = addDepartment;
module.exports.updateEmployeeRole = updateEmployeeRole;
module.exports.updateEmployeeManager = updateEmployeeManager;
module.exports.getAllCurrentManagers = getAllCurrentManagers;
module.exports.getEmployeesByManager = getEmployeesByManager;
module.exports.getEmployeesByDepartment = getEmployeesByDepartment;
module.exports.getDepartmentUtilizedBudget = getDepartmentUtilizedBudget;
module.exports.deleteEmployee = deleteEmployee;
module.exports.deleteRole = deleteRole;
module.exports.deleteDepartment = deleteDepartment;