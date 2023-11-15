const inquirer = require("inquirer");
const db = require('./config/connection.js');

function init () {
  inquirer.prompt([
    {
      type: "list",
      name: "firstOption",
      message: "Select an option.",
      choices: 
          [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role',
              'Exit',
          ],
    }.then((answer) => {
      if (answer.prompt === 'View all departments') {
        departmentData();
      } else if(answer.prompt === 'View all roles') {
        roleData();
      } else if(answer.prompt === 'View all employees') {
        employeeData();
      } else if(answer.prompt === 'Add a department') {
        addDepartment();
      } else if(answer.prompt === 'Add a role') {
        addRole();
      } else if(answer.prompt === 'Add an employee') {
        addEmployee();
      } else if(answer.prompt === 'Update an employee role') {
        updateEmployee();
      } else if (answer.prompt === 'Exit') {
        exit();
      }
      init();
    })
  ]);
};

// view department data
const departmentData = () => {
  
  init();
};

// view all role data
const roleData = () => {

};

// view all employee data
const employeeData = () => {

};

// add department to the company_db
const addDepartment = () => {

};

// add role to the company_db
const addRole = () => {

};

// add employee to the company_db
const addEmployee = () => {

};

// update an employee's role in the compnay_db
const updateEmployee = () => {

};

const exit = () => {

}

init();
