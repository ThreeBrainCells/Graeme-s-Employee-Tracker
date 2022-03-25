//imports and requires
require("console.table")
const mysql = require('mysql2');
const inquirer = require('inquirer')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Socrani45@?',
    database: 'company_db',
  })
db.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to the company_db database.`)
   startmenu()
})

const interfaceQuestion = [{
  type: "list",
  message: "What would you like to do?",
  name: "choice",
  choices: ["View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Quit"]
}]
const addDepartmentQuestion = [{
  type: "input",
  message: "What is this new department called?",
  name: "DeptName"
}]

let addRoleQuestions = [
  {
    type: "input",
    message: "What is this new role called?",
    name: "RoleName"
  }, {
    type: "input",
    message: "What is the new role's salary?",
    name: "RoleSalary"
  }, {
    type: "list",
    message: "What department is this role in?",
    name: "RoleDept",
    // choices: []
  }
]
let addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the new employee's first name?",
    name: "firstName"
  }, {
    type: "input",
    message: "What is the new employee's last name?",
    name: "lastName"
  }, {
    type: "list",
    message: "What is their role?",
    name: "empRole",
    // choices: [Link the database]
  }, {
    type: "list",
    message: "Who is their manager?",
    name: "empManager",
    // choices: [, "No Manager"]
  }
]
let updateEmployeeQuestions = [
  {
    type: "list",
    message: "Which employee are you updating?",
    name: "Updatee",
    //choices: []
  },{
    type: "list",
    message: "What is their new role?",
    name: "newRole",
    //choices: []
  }
]

function startmenu(){
  inquirer.prompt(interfaceQuestion)
  .then(function(response){
    switch(response.choice){
      case "View All Employees":
        viewAllEmployees()
        break;
      case "Add Employee":
        addEmployee()
        break;
      case "Update Employee Role":
        updateEmployeeRole()
        break;
      case "View All Roles":
        viewAllRoles()
        break;
      case "Add Role":
        addRole()
        break;
      case "View All Departments":
        viewAllDepts()
        break;
      case "Add Department":
        addDept()
        break;
      default:
        db.end()
        process.exit(0)
    }
  })
}

function viewAllEmployees(){
  db.query("SELECT employees.first_name AS Fname, employees.last_name AS Lname, roles.title AS Role, employees.id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager from employees LEFT JOIN employees manager ON manager.id = employees.manager_id JOIN roles ON roles.id = employees.roles_id;", function(err,data){
    if(err)throw err
    console.table(data)
    startmenu()
  })
};
function viewAllRoles(){
  db.query("SELECT departments.department_name, roles.title, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id;", function(err,data){
    if(err)throw err
    console.table(data)
    startmenu()
  })
};
function viewAllDepts(){
  db.query("SELECT * FROM departments;", function(err,data){
    if(err)throw err
    console.table(data)
    startmenu()
  })
};

function addDept(){
  inquirer.prompt(addDepartmentQuestion)
  .then(function(response){
    db.query("INSERT INTO departments (department_name) VALUES (?)",
    response.DeptName,
     function(err,data){
      if(err)throw err
      startmenu()
    })
  })
}

function addRole(){
  inquirer.prompt(addRoleQuestions)
  .then(function(response){
    db.query("INSERT INTO roles (title, salary, department_id) VALUES (?)",
    response.firstName,
    response.lastName,
    // response.RoleDept,
     function(err,data){
      if(err)throw err
      startmenu()
    })
  })
}

function addEmployee(){
  inquirer.prompt(addEmployeeQuestions)
  .then(function(response){
    db.query("INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?)",
    response.RoleName,
    response.RoleSalary,
    //response.empRole
    // response.empManager,
     function(err,data){
      if(err)throw err
      startmenu()
    })
  })
}

function updateEmployeeRole(){
  inquirer.prompt(updateEmployeeQuestions)
  .then(function(response){
    db.query(`UPDATE employees SET roles_id = ${response.newRole} WHERE employees.first_name = ${response.Updatee}`, function(err, data){
      if(err)throw err
      startmenu()
    })
  })
}