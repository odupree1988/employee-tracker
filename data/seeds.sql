INSERT INTO departments (dept_name)
VALUES 
("Sales"),
("Accounting"),
("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES
("Engineer", 100000.00, 3),
("Programmer", 75000.00, 3),
("Accountant", 60000.00, 2),
("CFO", 120000.00, 2),
("Sales Representative", 65000, 1),
("Marketer", 60000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL),
("Rusty", "Shackleford", 1, 1),
("Jamie", "Lynn", 1, 1),
("Miley", "Cyrus", 2, NULL),
("Billy", "Joel", 2, 2),
("Bob", "Dool", 2, 2),
("Mark", "Schultz", 3, NULL),
("Tiger", "Woods", 3, 3),
("Mark", "McGuire", 3, 3);