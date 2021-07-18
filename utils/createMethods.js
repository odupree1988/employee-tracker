const db = require("../data/connection");
const inquirer = require("inquirer");

const departmentPrompt = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please enter the name of the department.",
        validate: (departmentInput) => {
          if (departmentInput) {
            return true;
          }
          return "Please enter a new department!";
        },
      },
    ])
    .then((departmentData) => {
      const addDepartment = (departmentData) => {
        const sql = `INSERT INTO departments(dept_name)
        VALUES (?)`;

        const params = departmentData.department;

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      };
      addDepartment(departmentData);
      console.log("Department created successfully!");
    });
};

const rolePrompt = () => {
  const getRoleList = () => {
    const sql = `SELECT dept_name AS name, id AS value FROM departments;`;

    return db.promise().query(sql);
  };

  return getRoleList().then(([rows]) => {
    const roles = rows.map(({ name, value }) => {
      console.log(rows);
      return { name: name, value: value };
    });
    return inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "Please enter the new role.",
          validate: (roleInput) => {
            if (roleInput) {
              return true;
            }
            return "Please enter a new role!";
          },
        },
        {
          type: "number",
          name: "salary",
          message: "Please enter a salary amount.",
          validate: (salaryInput) => {
            if (salaryInput) {
              return true;
            }
            return "Please enter a salary amount!";
          },
        },
        {
          type: "list",
          name: "roleDepartment",
          message: "Please enter the deparment that this role belongs to",
          choices: roles,
        },
      ])
      .then((roleData) => {
        const addRole = (roleData) => {
          const sql = `INSERT INTO roles(title, salary, department_id)
                    VALUES (?,?,?)`;

          const params = [
            roleData.roleName,
            roleData.salary,
            roleData.roleDepartment,
          ];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
            }
          });
        };
        addRole(roleData);
        console.log("Role created successfully!");
      });
  });
};

const employeePrompt = () => {
  const getManagerIdList = () => {
    const sql = `SELECT concat(first_name, " ", last_name) AS name, 
                id AS value FROM employees`;

    return db.promise().query(sql);
  };

  return getManagerIdList().then(([rows]) => {
    const manager = rows.map(({ name, value }) => {
      console.log(rows);
      return { name: name, value: value };
    });

    const getRolesList = () => {
      const sql = `SELECT title AS name, id AS value FROM roles`;

      return db.promise().query(sql);
    };
    return getRolesList().then(([rows]) => {
      const roles = rows.map(({ name, value }) => {
        console.log(rows);
        return { name: name, value: value };
      });

      return inquirer

        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Please enter employee's first name",
            validate: (firstNameInput) => {
              if (firstNameInput) {
                return true;
              }
              return "Please enter employee's first name!";
            },
          },
          {
            type: "input",
            name: "lastName",
            message: "Please enter employee's last name",
            validate: (lastNameInput) => {
              if (lastNameInput) {
                return true;
              }
              return "Please enter employee's last name!";
            },
          },
          {
            type: "list",
            name: "roleId",
            message: "Please select the role of the new employee",
            choices: roles,
          },
          //pass in a function that returns an array
          // runs query to select all roles
          // returns formatted array
          {
            type: "list",
            name: "managerId",
            message: "Please choose a manager for this employee",
            choices: manager,
          },
        ])
        .then((employeeData) => {
          const addEmployee = (employeeData) => {
            const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
                    VALUES (?,?,?,?)`;

            const params = [
              employeeData.firstName,
              employeeData.lastName,
              employeeData.roleId,
              employeeData.managerId,
            ];

            db.query(sql, params, (err, result) => {
              if (err) {
                console.log(err);
              }
              return result;
            });
          };

          console.log("Employee created successfully!");
          const add = addEmployee(employeeData);
          add;
          console.log(employeeData);
          console.log(addEmployee);
        });
    });
  });
};

const updateEmployeeRole = () => {
  const selectEmployee = () => {
    const sql = `SELECT concat(first_name, ' ', last_name) AS name,
                id AS value FROM employees`;

    return db.promise().query(sql);
  };

  return selectEmployee().then(([rows]) => {
    const employee = rows.map(({ name, value }) => {
      return { name, value };
    });

    const roleUpdate = () => {
      const sql = `SELECT title AS name, id AS value FROM roles`;

      return db.promise().query(sql);
    };

    return roleUpdate().then(([rows]) => {
      const role = rows.map(({ name, value }) => {
        return { name, value };
      });

      return inquirer
        .prompt([
          {
            type: "list",
            name: "updateEmplotee",
            message: "Please choose the employee you would like to update.",
            choices: employee,
          },
          {
            type: "list",
            name: "updateRole",
            message: "What would you like the new role to be?",
            choices: role,
          },
        ])
        .then((updateData) => {
          const updateEmployee = (updateData) => {
            const sql = `UPDATE employees
                      SET role_id = ?
                      WHERE employees.id = ?`;

            const params = [updateData.role, updateData.employee];

            db.query(sql, params, (err, result) => {
              if (err) {
                console.log(err);
              }
              return result;
            });
          };
          console.log("Employee created successfully!");
          const add = updateEmployee(updateData);
          add;
        });
    });
  });
};

module.exports = {
  departmentPrompt,
  rolePrompt,
  employeePrompt,
  updateEmployeeRole,
};
