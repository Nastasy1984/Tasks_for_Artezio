CREATE DATABASE IF NOT EXISTS staff;
USE staff;
CREATE TABLE IF NOT EXISTS employees (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
job VARCHAR(30) NOT NULL,
salary INT UNSIGNED NOT NULL
);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Alex', 'Alexeev', 'cleaner', 15000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Boris', 'Borisov', 'driver', 17000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Victor', 'Victorov', 'tester', 25000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Gena', 'Glomov', 'manager', 45000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Denis', 'Denisov', 'director', 150000);
SELECT id, first_name, last_name, job, salary FROM employees WHERE salary < 30000;
SELECT id, first_name, last_name, job, salary FROM employees WHERE salary < 30000 AND job = 'cleaner';