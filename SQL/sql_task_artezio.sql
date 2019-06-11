CREATE DATABASE IF NOT EXISTS mystaff;
USE mystaff;
CREATE TABLE IF NOT EXISTS employees (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
job VARCHAR(30) NOT NULL,
salary INT UNSIGNED NOT NULL
);

INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Alex', 'Alexeev', 'driver', 15000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Boris', 'Borisov', 'driver', 17000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Victor', 'Victorov', 'driver', 25000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Gena', 'Glomov', 'manager', 45000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Egor', 'Egorov', 'manager', 29000);
INSERT INTO employees ( id, first_name, last_name, job, salary) VALUES (null, 'Denis', 'Denisov', 'director', 150000);

SELECT id, first_name, last_name, job, salary FROM employees WHERE salary < 30000;
SELECT id, first_name, last_name, job, salary FROM employees WHERE salary < 30000 AND job = 'driver';

CREATE TABLE IF NOT EXISTS chief_subordinate (
id_chief INT UNSIGNED,
id_sub INT UNSIGNED,
CONSTRAINT chief_subordinate_pk PRIMARY KEY (id_chief, id_sub),
FOREIGN KEY (id_chief)  REFERENCES employees (id) ON DELETE CASCADE,
FOREIGN KEY (id_sub)  REFERENCES employees (id) ON DELETE CASCADE
);

INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (4, 1);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (4, 2);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (4, 3);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (5, 2);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (6, 4);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (6, 5);

SELECT employees.id, employees.last_name, employees.first_name, employees.job, employees.salary FROM chief_subordinate INNER JOIN employees ON id_sub=id WHERE id_chief=6;

SELECT employees.id, employees.last_name, employees.first_name, employees.job, employees.salary FROM chief_subordinate INNER JOIN employees ON id_sub=id WHERE id_chief=(SELECT id FROM employees WHERE last_name='Glomov');