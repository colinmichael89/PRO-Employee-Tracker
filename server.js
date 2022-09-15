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
          "Update an employee manager",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;

        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
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
          updateRole();
          break;

        case "Update an employee manager":
          updateManager();
          break;

        case "Exit":
          exit();
          break;
      }
    });
};

// Function to show all employees
viewEmployees = () => {
  console.log("Showing all employees...\n");
  const sql = 

  db.promise().query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

// Function to show all departments 
viewDepartments = () => {
  console.log("Showing all departments...\n");
  const sql = `SELECT department.id, department.name AS department FROM department`;

  db.promise().query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};
// Function to show all employee roles 
viewRoles = () => {
  console.log("Showing all employee roles...\n");
  const sql = ``;

  db.promise().query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};
// Function to add an employee
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const params = [answer.firstName, answer.lastName];
//
//
//
//
//

    // Function to add a department
addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDept',
      message: "What department do you want to add?",
      validate: addDept => {
        if (addDept) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDept + " to departments!"); 

        viewDepartments();
    });
  });
};

// Function to add a role
addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {
        if (isNAN(addSalary)) {
            return true;
        } else {
            console.log('Please enter a salary');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];
      // Get department ID
      const sql = ``;
      db.
      // 



// Function to update an employee role
updateRole = () => {
  inquirer.prompt([


// Function to update an employee manager
updateManager = () => {
  inquirer.prompt([