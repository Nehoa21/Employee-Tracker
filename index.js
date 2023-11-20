const inquirer = require("inquirer");
const db = require('./config/connection.js');

function runDatabase () {
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
    
    // run function based on choice
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
      runDatabase();
    })
  ]);
};

// --- View Database ---

// view department data
const departmentData = () => {
  const sql = `SELECT * FROM department`;
  
  db.query(sql, (err, choice) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Viewing Department data:');
    console.table(choice);
  });
  runDatabase();
};

// view all role data
const roleData = () => {
  const sql = `SELECT * FROM roles JOIN department_id ON roles.department_id = department.names`;
  
  db.query(sql, (err, choice) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Viewing Roles data:');
    console.table(choice);
  });
  runDatabase();
};

// view all employee data
const employeeData = () => {
  const sql = `SELECT * FROM employee JOIN role_id ON employee.role_id = title JOIN department_id ON employee.department_id`;
  
  db.query(sql, (err, choice) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Viewing Employee data:');
    console.table(choice);
  });
  runDatabase();
};

// --- Add to Database ---

// add department to the company_db database
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new department?',
      name: 'newDepartment',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Add a department name');
          return false;
        };
      }
    }
  ]).then((answer) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [answer.newDepartment];
    
    db.query(sql, params, (err, choice) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Added ${params} to the Department table`);
      console.table(choice);
    });
  });
  runDatabase();
};

// add role to the company_db database
const addRole = () => {
  db.query('SELECT * FROM department', (err, result) => {
    if (err) {
      console.log(err);
    }
    inquirer.prompt([
      {
        // 
        type: 'input',
        message: 'What role would you like to add?',
        name: 'newRole',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Add a role name');
            return false;
          };
        },
      },
      {
        type: 'input',
        message: 'How much is the salary?',
        name: 'salary',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Add a salary');
            return false;
          }
        }
      },
      {
        type: 'input',
        message: 'What department does the role belong to?',
        name: 'department',
        validate: () => {
          let departmentArr = [];
          for (let i = 0; i < array.length; i++) {
            departmentArr.push(result[i].name);
          }
          return departmentArr;
        }
      }
    ]).then((answer) => {
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [answer.newRole, answer.salary, answer.department];
      
      db.query(sql, params, (err, choice) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Added ${answer.newRole} to the database`);
        console.table(choice);
      });
    });
    runDatabase();
  });
};

// add employee to the company_db
const addEmployee = () => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    }
    inquirer.prompt([
      {
        // 
        type: 'input',
        message: 'What is the firat name of the employee?',
        name: 'firstName',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Add the first name');
            return false;
          };
        },
      },
      {
        type: 'input',
        message: 'What is the last name of the employee?',
        name: 'lastName',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Add the last name');
            return false;
          }
        }
      },
      {
        type: 'input',
        message: 'What role does the employee have?',
        name: 'role',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Add the role for the employee');
            return false;
          }
        }
      },
      {
        type: 'input',
        message: 'Who is the manager for the employee?',
        name: 'manager',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('Enter the name of the manager');
            return false;
          }
        }
      }
    ]).then((answer) => {
      db.query('SELECT * FROM employees, roles', (err, result) => {
        if(err) {
          console.log(err);
        }
      });
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [answer.firstName, answer.lastName, answer.role, answer.manager];
      
      db.query(sql, params, (err, choice) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Added ${answer.firstName} ${answer.lastName} to the database.`);
        });
      });
      runDatabase();
  });
};

// --- Update Employee Database ---

// update an employee's role in the compnay_db
const updateEmployee = () => {
  db.query('SELECT * FROM employees, roles', (err, choice) => {
    if (err) {
      console.log(err);
    }
    inquirer.prompt([
      {
        // 
        type: 'input',
        message: 'What employee do you want to update?',
        name: 'employee',
        validate: () => {
          let arr = [];
          for(let i = 0; i < choice.length; i++) {
            arr.push(result[i].last_name);
          };
          let employeeArr = [...new Set(arr)];
          return employeeArr;
        },
      },
      {
        type: 'input',
        message: 'What is their new role?',
        name: 'role',
        validate: () => {
          let arr = [];
          for(let i = 0; i < choice.length; i++) {
            arr.push(result[i].title);
          };
          let roleArr = [...new Set(arr)];
          return roleArr;
        }
      },
    ]).then((answer) => {

      for (let i = 0; i < choice.length; i++) {
        if (choice[i].last_name === answer.employee) {
          var employeeName = choice[i];
        };       
      };

      for (let i = 0; i < choice.length; i++) {
        if (choice[i].title === answer.role) {
          var newRole = choice[i];
        };        
      };
  
      const sql = `UPDATE employees SET ? WHERE ?`;
      const params = [{role_id: newRole}, {last_name: employeeName}];
    
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(`Updated ${answer.employee}'s role in the database.`);
      });
    });
  });   
  runDatabase();
};

// --- Exit ---

// Exit function
const exit = () => {
  db.end();
  console.log('Database ended.');
}
