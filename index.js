const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");


// Connect to db
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password', 
    database: 'employer_tracker' //had this at classlist_db for a day..................
  },
  console.log(`Connected to the employer_tracker database.`)
);

db.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

//inquirer prompt using switch cases for choices?
//mainmenu function w/ inquirer, prompts choices for options
//function for each action? call funciton in switch cases.
// query db for info in function?
function mainMenu() {
  inquirer
  .prompt({
    type: "list",
    name: "mainMenu",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Add Employee",
      "Add Department",
      "Add Role",
      "Update Employee Role",
      "Exit"
    ]
  })
  .then(function(answer) {
      //switch cases
      switch (answer.mainMenu){
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;
        
        case "Add Department":
          addDepartment();
        
        case "Add Role":
          addRole();
          break;

        case "View All Roles":
          viewRoles();
          break;
        
        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;
        
        case "Exit":
          db.end()
          break;
      //exit just ends prompt, not close server. Want entire program to shut off.
      }
  });
}
//switch cases working.
//functions i will need, call in switch cases
function viewAllEmployees() {
   //this took way too long
   //is working as intended
   var querydb = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
   db.query(querydb, function (err, res) {
     //console.log(res);
        console.table(res);
        mainMenu();
      })
  };

function viewAllDepartments() {

  var querydb = "SELECT * FROM department"
  db.query(querydb, function (err, res) {
    //console.log(res);
      console.table(res);
      mainMenu();
  })
};

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's title",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "Enter the employee's salary",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "Enter the employee's department ID",
        name: "roleDept"
      }
    ])
  .then(function (res) {
    const title = res.roleTitle;
    const salary = res.roleSalary;
    const departmentID = res.roleDept;
    var querydb = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
    db.query(querydb, function (err, res) {
      if (err) {
        throw err;
      }
      //console.log(res);
      console.table(res);
      mainMenu();
    });
  });
};

function viewRoles() {
  var querydb = "SELECT * FROM role"
  db.query(querydb, function (err, res) {
    //console.log(res);
    console.table(res);
    mainMenu();
  })
};

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role ID",
        name: "addEmployeeRole"
      },
      {
        type: "input",
        message: "Enter the employee's manager ID",
        name: "addManagerID"
      }
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const employeeRole = res.addEmployeeRole;
      const managerID = res.addManagerID;
      //managerID returning undefined
      //console.log(firstName, lastName, employeeRole);
      const querydb = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRole}", "${managerID}")`;

      db.query (querydb, function (err, res) {
        if (err) {
          throw err;
        }

        console.table(res);
        mainMenu();
      })
    })
};

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "newDepartment"
    })
      .then(function (res) {
        const newDepartment = res.newDepartment
        const querydb = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;

        db.query(querydb, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          mainMenu();
        })
      })
};

function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's ID you want to be updated",
          name: "updateEmployee"
        },
        {
          type: "input",
          message: "Enter the new role ID for the employee",
          name: "newRole"
        }
      ])
      .then(function (res) {
        const updateEmployee = res.updateEmployee;
        const newRole = res.newRole;

        const querydb = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmployee}"`;

        db.query(querydb, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          mainMenu();
        })
      })
};