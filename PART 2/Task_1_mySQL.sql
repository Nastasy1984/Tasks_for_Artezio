/* Creating new database */ 
CREATE DATABASE IF NOT EXISTS my_staff1;
USE my_staff1;

/* Creating table with departments */
CREATE TABLE IF NOT EXISTS departments (
dep_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
dep VARCHAR(30) NOT NULL
);


/* Inserting data to the table with departments */
INSERT INTO departments ( dep_id, dep) VALUES (null, 'marketing');
INSERT INTO departments ( dep_id, dep) VALUES (null, 'sales');
INSERT INTO departments ( dep_id, dep) VALUES (null, 'director');
INSERT INTO departments ( dep_id, dep) VALUES (null, 'IT');
INSERT INTO departments ( dep_id, dep) VALUES (null, 'logistic');

/* Creating table with employees */
CREATE TABLE IF NOT EXISTS employees (
emp_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
salary INT UNSIGNED NOT NULL,
dep_id SMALLINT UNSIGNED,
FOREIGN KEY (dep_id) REFERENCES departments (dep_id) ON DELETE SET NULL
);

/* Inserting data to the table with employees */
INSERT INTO employees ( emp_id, first_name, last_name, salary, dep_id) VALUES (null, 'Alex', 'Alexeev', 10000, 1);
INSERT INTO employees ( emp_id, first_name, last_name, salary, dep_id) VALUES (null, 'Boris', 'Borisov', 12000, 1);
INSERT INTO employees ( emp_id, first_name, last_name, salary, dep_id) VALUES (null, 'Victor', 'Victorov', 14000, 1);
INSERT INTO employees ( emp_id, first_name, last_name, salary, dep_id) VALUES (null, 'Gena', 'Glomov', 15000, 2);
INSERT INTO employees ( emp_id, first_name, last_name, salary, dep_id) VALUES (null, 'Egor', 'Egorov', 17000, 2);
INSERT INTO employees ( emp_id, first_name, last_name, salary, dep_id) VALUES (null, 'Denis', 'Denisov', 18000, 2);
INSERT INTO employees ( emp_id, first_name, last_name, salary, dep_id) VALUES (null, 'Fedor', 'Fedorov', 100000, 3);


/* Selecting all employees from the sales department ordered by last name */
SELECT
	employees.emp_id, employees.first_name, employees.last_name,
	employees.salary, departments.dep
FROM employees
INNER JOIN departments ON employees.dep_id=departments.dep_id
WHERE departments.dep = "sales"
ORDER BY employees.last_name ASC;

/* Selecting all employees from the marketing department ordered by salary */
SELECT
	employees.emp_id, employees.first_name, employees.last_name,
	employees.salary, departments.dep
FROM employees
INNER JOIN departments ON employees.dep_id=departments.dep_id
WHERE departments.dep = "marketing"
ORDER BY employees.salary ASC;

/* Changing department for the employee with id = 1 */
UPDATE employees SET employees.dep_id=2 WHERE emp_id=1;

/* Changing last name for the employee with id = 2 */
UPDATE employees SET employees.last_name="Bobov" WHERE emp_id=2;

/* I did it, because the program asked to disable safe mode to delete element */
SET SQL_SAFE_UPDATES = 0;

/* Deleting the logistic department */
DELETE FROM departments WHERE dep = 'logistic';


/* Selecting all departments without employees */
SELECT dep
FROM departments
WHERE dep_id IN (
SELECT dep_id FROM employees);

/* Deleting the director department with setting null in employees table for this employee */
/* just for checking if the work of foreign key "set null on delete" is correct */
DELETE FROM departments WHERE dep = 'director';