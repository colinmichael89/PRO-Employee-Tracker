// Requirements
const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware to parse incoming JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

const db = mysql.createConnection(
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
    afterConnection();
  })
);

// Function to start the Inquirer prompts
afterConnection = () => {
  console.log("***********************************");
  console.log("*                                 *");
  console.log("*      PRO EMPLOYEE TRACKER       *");
  console.log("*                                 *");
  console.log("***********************************");
  promptUser();
};

// inquirer prompt for first action
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all departments",
          "View all roles",
          "Add an employee",
          "Add a department",
          "Add a role",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Update an employee role":
          updateEmployeeRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

// Function to show all employees
showEmployees = () => {
  console.log("Showing all employees...\n");
  const sql = 

// Function to show all departments 
showDepartments = () => {
  console.log("Showing all departments...\n");
  const sql = `SELECT department.id, department.name AS department FROM department`;

  db.promise().query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};