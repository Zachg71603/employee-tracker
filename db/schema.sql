DROP DATABASE IF EXISTS employer_tracker;
CREATE DATABASE employer_tracker;

USE employer_tracker;

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL auto_increment,
    department_name VARCHAR(40),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT NOT NULL auto_increment,
    title VARCHAR(40),
    salary decimal (8,2),
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);


-- https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html#:~:text=Standard%20SQL%20requires%20that%20DECIMAL,DECIMAL(%20M%20%2C0)%20.