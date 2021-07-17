const inquirer = require("inquirer");
const cTable = require("console.table");
const {
  departmentPrompt,
  rolePrompt,
  employeePrompt,
} = require("./utils/createMethods");
const {
  viewDepartments,
  viewEmployees,
  viewRoles,
} = require("./utils/viewMethods");

//connect to mysql database
//create seeds for tables
//write prompts with inquirer to collect data
//show tables with colsole.table in the cil
//update add for employee, role, department
//update delete for employee, role, department

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then(({ selection }) => {
      switch (selection) {
        case "View all departments":
          viewDepartments
            .then((results) => {
              console.table(results);
              promptUser();
            })
            .catch((err) => console.error);
          break;
        case "View all roles":
          viewRoles
            .then((results) => {
              console.table(results);
              promptUser();
            })
            .catch((err) => console.error);
          break;
        case "View all employees":
          viewEmployees
            .then((results) => {
              console.table(results);
              promptUser();
            })
            .catch((err) => console.error);
          break;
        case "Add a department":
          departmentPrompt().then(promptUser);
          break;
        case "Add a role":
          rolePrompt().then(promptUser);
          break;
        case "Add an employee":
          employeePrompt().then(promptUser);
          break;
        case "Update an employee role":
          break;
      }
    });
};

promptUser();
