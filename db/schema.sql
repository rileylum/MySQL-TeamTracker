DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;

USE team_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);