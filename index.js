const inquirer = require("inquirer");
const { Department, Employee, Role } = require('./models');

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
          ],
    }.then((answer) => {
      if (answer.firstOption === 'View all departments') {
        departmentData();
      } else if(answer.firstOption === 'View all roles') {
        roleData();
      } else if(answer.firstOption === 'View all employees') {
        employeeData();
      } else if(answer.firstOption === 'Add a department') {
        addDepartment();
      } else if(answer.firstOption === 'Add a role') {
        addRole();
      } else if(answer.firstOption === 'Add an employee') {
        addEmployee();
      } else if(answer.firstOption === 'Update an employee role') {
        updateEmployee();
      }
      init();
    })
  ]);
};

const departmentData = () => {

};

const roleData = () => {

};

const employeeData = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const addEmployee = () => {

};

const updateEmployee = () => {
  
};

init();
