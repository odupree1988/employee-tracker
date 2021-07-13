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
        choices: [1, 2, 3],
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
};

const employeePrompt = () => {
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
        choices: [1, 2, 3],
      },
      {
        type: "list",
        name: "managerId",
        message: "Please choose a manager for this employee",
        choices: [1, 2, 3],
      },
    ])
    .then((employeeData) => {
      const addEmployee = (employeeData) => {
        const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
                  VALUES (?,?,?, ?)`;

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
        });
      };
      addEmployee(employeeData);
      console.log("Employee created successfully!");
    });
};

module.exports = { departmentPrompt, rolePrompt, employeePrompt };
