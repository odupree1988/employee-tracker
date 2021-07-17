const promptUser = require("..");
const db = require("../data/connection");

const viewDepartments = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM departments`;

  let results = db.query(sql, (err, results) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
});

const viewRoles = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM roles`;

  let results = db.query(sql, (err, results) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
});

const viewEmployees = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM employees`;

  let results = db.query(sql, (err, results) => {
    if (err) {
      reject(err);
    }
    resolve(results);
  });
});

module.exports = { viewDepartments, viewRoles, viewEmployees };
