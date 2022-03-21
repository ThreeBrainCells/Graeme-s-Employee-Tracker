//imports and requires
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Socrani45@?',
      database: 'company_db',
    },
    console.log(`Connected to the company_db database.`)
  );

const interfaceQuestion = {
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
}
const addDepartmentQuestion = {
    type: "input",
    message: "What is this new department called?",
    name: "DeptName"
  }

const addRoleQuestions = [
  {
    type: "input",
    message: "What is this new role called?",
    name: "RoleName"
  },{
    type: "input",
    message: "What is the new role's salary?",
    name: "RoleSalary"
  },{
    type: "list",
    message: "What department is this role in?",
    name: "RoleDept",
    //choices: [Once i figure out how to pass in the departments from the database]
  }
]
const addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the new employee's first name?",
    name: "firstName"
  },{
    type: "input",
    message: "What is the new employee's last name?",
    name: "lastName"
  },{
    type: "list",
    message: "What is their role?",
    name: "empRole",
    // choices: [Link the database]
  },{
    type: "list",
    message: "Who is their manager?",
    name: "empManager",
    // choices: [, "No Manager"]
  }
]