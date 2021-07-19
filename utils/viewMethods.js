const db = require("../data/connection");

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;

  let results = db.promise().query(sql);

  return results;
};

const viewRoles = () => {
  const sql = `SELECT roles.id AS Id, title AS Title, dept_name AS Department, salary as Salary
              FROM roles, departments
              WHERE department_id = departments.id`;

  let results = db.promise().query(sql);

  return results;
};

const viewEmployees = () => {
  const sql = `SELECT e.id as Id, e.first_name AS ' First Name ', e.last_name AS 'Last Name', title as Title, dept_name AS Department, salary AS Salary, concat(m.first_name, ' ',m.last_name) AS Manager 
              FROM employees e 
              LEFT JOIN roles ON role_id = roles.id 
              LEFT JOIN departments on department_id = departments.id 
              LEFT JOIN employees m on e.manager_id = m.id`;
  let results = db.promise().query(sql);

  return results;
};

module.exports = { viewDepartments, viewRoles, viewEmployees };
