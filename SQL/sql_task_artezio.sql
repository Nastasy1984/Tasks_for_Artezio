/* Creating new database */ 
CREATE DATABASE IF NOT EXISTS mystaff;
USE mystaff;

/* Creating table with employees */
CREATE TABLE IF NOT EXISTS employees (
emp_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
salary INT UNSIGNED NOT NULL
);

/* Creating table with positions */
CREATE TABLE IF NOT EXISTS positions (
pos_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
positions VARCHAR(30) NOT NULL
);

/* Inserting data to the table with employees */
INSERT INTO employees ( emp_id, first_name, last_name, salary) VALUES (null, 'Alex', 'Alexeev', 15000);
INSERT INTO employees ( emp_id, first_name, last_name, salary) VALUES (null, 'Boris', 'Borisov', 17000);
INSERT INTO employees ( emp_id, first_name, last_name, salary) VALUES (null, 'Victor', 'Victorov', 25000);
INSERT INTO employees ( emp_id, first_name, last_name, salary) VALUES (null, 'Gena', 'Glomov', 45000);
INSERT INTO employees ( emp_id, first_name, last_name, salary) VALUES (null, 'Egor', 'Egorov', 29000);
INSERT INTO employees ( emp_id, first_name, last_name, salary) VALUES (null, 'Denis', 'Denisov', 150000);

/* Inserting data to the table with positions */
INSERT INTO positions ( pos_id, positions) VALUES (null, 'driver');
INSERT INTO positions ( pos_id, positions) VALUES (null, 'manager');
INSERT INTO positions ( pos_id, positions) VALUES (null, 'director');

/* Adding column with position's id to the table with employees */
ALTER TABLE employees ADD pos_id SMALLINT UNSIGNED NOT NULL;
UPDATE employees SET pos_id=1 WHERE emp_id IN (1,2,3);
UPDATE employees SET pos_id=2 WHERE emp_id IN (4,5);
UPDATE employees SET pos_id=3 WHERE emp_id IN (6);

/* Selecting all employees with salary less than 30 000 */
SELECT
	employees.emp_id, employees.first_name, employees.last_name,
	employees.salary, positions.positions
FROM employees
INNER JOIN positions ON employees.pos_id=positions.pos_id
WHERE employees.salary < 30000;

/* Selecting all employees with salary less than 30 000 and job driver */
SELECT
	employees.emp_id, employees.first_name, employees.last_name,
	employees.salary, positions.positions
FROM employees
INNER JOIN positions ON employees.pos_id=positions.pos_id
WHERE employees.salary < 30000 AND positions.positions = 'driver';

/* Creating table with relations chief-subordinate */
CREATE TABLE IF NOT EXISTS chief_subordinate (
id_chief SMALLINT UNSIGNED UNSIGNED,
id_sub SMALLINT UNSIGNED UNSIGNED,
CONSTRAINT chief_subordinate_pk PRIMARY KEY (id_chief, id_sub),
FOREIGN KEY (id_chief) REFERENCES employees (emp_id) ON DELETE CASCADE,
FOREIGN KEY (id_sub) REFERENCES employees (emp_id) ON DELETE CASCADE
);

/* Inserting data to the table with relations chief-subordinate */
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (4, 1);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (4, 2);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (4, 3);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (5, 2);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (6, 4);
INSERT INTO chief_subordinate (id_chief, id_sub) VALUES (6, 5);

/* Selecting all subordinates of the employee with last_name Glomov (selecting subordinates by last name) */
SELECT employees.emp_id, employees.last_name, employees.first_name, positions.positions, employees.salary 
FROM chief_subordinate 
INNER JOIN employees ON id_sub=emp_id 
INNER JOIN positions ON employees.pos_id=positions.pos_id
WHERE id_chief=(SELECT emp_id FROM employees WHERE last_name='Glomov');

/* Selecting all subordinates of the employee with id 6 (selecting subordinates by id) */
SELECT employees.emp_id, employees.last_name, employees.first_name, positions.positions, employees.salary 
FROM chief_subordinate 
INNER JOIN employees ON id_sub=emp_id 
INNER JOIN positions ON employees.pos_id=positions.pos_id
WHERE id_chief=6;

