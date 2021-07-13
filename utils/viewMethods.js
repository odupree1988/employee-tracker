const db = require("../data/connection");

const viewDepartments = () => {
  console.log("view departments");
  //   const sql = `SELECT * FROM departments`;

  //   //   await promptUser();
  //   db.query(sql, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.table(results);
  //   });
};

const viewRoles = () => {
  console.log("view roles");
  //     const sql = `SELECT * FROM roles`;

  //     db.query(sql, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.table(results);
  //     });
};

const viewEmployees = () => {
  console.log("view employees");
  // const sql = `SELECT * FROM employees`;

  // db.query(sql, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(results);
  // });
};

module.exports = { viewDepartments, viewRoles, viewEmployees };
