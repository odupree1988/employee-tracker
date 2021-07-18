const db = require("../data/connection");

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;

  let results = db.promise().query(sql);

  return results;
};

const viewRoles = () => {
  const sql = `SELECT * FROM roles`;

  let results = db.promise().query(sql);

  return results;
};

const viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  // first_name, last_name, role_id, manager_id FROM employees
  //     concat(manager.first_name, ' ', manager.last_name)
  //     AS manager FROM employees
  //     LEFT JOIN employees manager
  //     ON manager_id = employees.manager_id = employees.id
  //     concat(manager.first_name " ", manager.last_name);

  let results = db.promise().query(sql);

  return results;
};

module.exports = { viewDepartments, viewRoles, viewEmployees };
