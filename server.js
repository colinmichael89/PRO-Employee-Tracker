// Requirements
const express = require("express");
const mysql = require("mysql2");
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
// connection to database
const db = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `Doobie#1!`,
  database: `employee_db`,
});

app.listen(PORT, () => {
  console.log(`***********************************`);
  console.log(`*                                 *`);
  console.log(`*      PRO EMPLOYEE TRACKER       *`);
  console.log(`*                                 *`);
  console.log(`***********************************`);
  promptUser();
});

// inquirer prompt for first action
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: `list`,
        name: `action`,
        message: `What would you like to do?`,
        choices: [
          `View all employees`,
          `View all departments`,
          `View all roles`,
          `Add an employee`,
          `Add a department`,
          `Add a role`,
          `Update an employee role`,
          `Update an employee manager`,
          `Exit`,
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case `View all employees`:
          viewEmployees();
          break;

        case `View all departments`:
          viewDepartments();
          break;

        case `View all roles`:
          viewRoles();
          break;

        case `Add an employee`:
          addEmployee();
          break;

        case `Add a department`:
          addDepartment();
          break;

        case `Add a role`:
          addRole();
          break;

        case `Update an employee role`:
          updateRole();
          break;

        case `Update an employee manager`:
          updateManager();
          break;

        case `Exit`:
          exit();
          break;
      }
    });
};

// Function to show all employees
viewEmployees = () => {
  console.log(`Showing all employees...\n`);
  const sql = `SELECT employee.id, 
  employee.first_name, 
  employee.last_name, 
  role.title, 
  department.name AS department,
  role.salary, 
  CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

// Function to show all departments
viewDepartments = () => {
  console.log(`Showing all departments...\n`);

  const sql = `SELECT department.id, department.name AS department FROM department`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};
// Function to show all employee roles
viewRoles = () => {
  console.log(`Showing all employee roles...\n`);
  const sql = `SELECT role.id, role.title, role.salary, role.department_id AS department FROM role`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};
// Function to add an employee
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: `input`,
        name: `firstName`,
        message: `What is the employee's first name?`,
        validate: (addFirst) => {
          if (addFirst) {
            return true;
          } else {
            console.log(`Please enter a first name`);
            return false;
          }
        },
      },
      {
        type: `input`,
        name: `lastName`,
        message: `What is the employee's last name?`,
        validate: (addLast) => {
          if (addLast) {
            return true;
          } else {
            console.log(`Please enter a last name`);
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.firstName, answer.lastName];
      // Get role id and title from roles table
      const sql = `SELECT role.id, role.title FROM role`;

      db.query(sql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: `What is the employee's role?`,
              choices: roles,
            },
          ])
          .then((roleSelection) => {
            const role = roleSelection.role;
            params.push(role);

            const sql = `SELECT * FROM employee`;

            db.query(sql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + ` ` + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: `list`,
                    name: `manager`,
                    message: `Who is the employee's manager?`,
                    choices: managers,
                  },
                ])
                .then((managerSelection) => {
                  const manager = managerSelection.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log(`Employee has been added!`);
                    viewEmployees();
                  });
                });
            });
          });
      });
    });
};
// Function to add a department
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: `input`,
        name: `addDept`,
        message: `What department do you want to add?`,
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log(`Please enter a department`);
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      db.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log(`Added ${answer.addDept} to departments!`);

        viewDepartments();
      });
    });
};

// Function to add a role
// Should this be choices/select or input?
addRole = () => {
  inquirer
    .prompt([
      {
        type: `input`,
        name: `role`,
        message: `What role do you want to add?`,
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log(`Please enter a role`);
            return false;
          }
        },
      },
      {
        type: `input`,
        name: `salary`,
        message: `What is the salary of this role?`,
        validate: (addSalary) => {
          if (addSalary !== NaN) {
            return true;
          } else {
            console.log(`Please enter a salary`);
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.role, answer.salary];
      // Get department ID
      const sql = `SELECT name, id FROM department`;

      db.query(sql, (err, data) => {
        if (err) throw err;

        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
          .prompt([
            {
              type: `list`,
              name: `dept`,
              message: `What department is this role in?`,
              choices: dept,
            },
          ])
          .then((deptSelection) => {
            const dept = deptSelection.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log(`Added ${answer.role} to roles!`);

              viewRoles();
            });
          });
      });
    });
};

// Function to update an employee role
updateRole = () => {
  // get employees from employee table
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + ` ` + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: `list`,
          name: `name`,
          message: `Which employee would you like to update?`,
          choices: employees,
        },
      ])
      .then((empSelection) => {
        const employee = empSelection.name;
        const params = [];
        params.push(employee);

        const sql = `SELECT * FROM role`;

        db.query(sql, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: `list`,
                name: `role`,
                message: `What is the employee's new role?`,
                choices: roles,
              },
            ])
            .then((roleSelection) => {
              const role = roleSelection.role;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log(`Employee role has been updated!`);

                viewEmployees();
              });
            });
        });
      });
  });
};

// function to update employee manager
updateManager = () => {
  // get employees from employee table
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + ` ` + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: `list`,
          name: `name`,
          message: `Which employee would you like to update?`,
          choices: employees,
        },
      ])
      .then((empSelection) => {
        const employee = empSelection.name;
        const params = [];
        params.push(employee);

        const sql = `SELECT * FROM employee`;

        db.query(sql, (err, data) => {
          if (err) throw err;

          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + ` ` + last_name,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: `list`,
                name: `manager`,
                message: `What is the name of the employee's manager?`,
                choices: managers,
              },
            ])
            .then((managerSelection) => {
              const manager = managerSelection.manager;
              params.push(manager);

              let employee = params[0];
              params[0] = manager;
              params[1] = employee;

              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log("Employee has been updated!");

                viewEmployees();
              });
            });
        });
      });
  });
};

// Exit application
exit = () => {
  console.log(`Goodbye!`);
  process.exit();
};
