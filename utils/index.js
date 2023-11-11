const inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "list",
    name: "firstOption",
    choices: 
        [
            'View all departments',
            'View all roles',
            'view all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
        ]
        
  },
]);
