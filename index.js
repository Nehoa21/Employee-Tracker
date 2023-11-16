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

// --- View Databases ---

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

// --- Add to Databases ---

// add department to the company_db
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

// add role to the company_db
const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'newDepartment',
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Add a department name');
          return false;
        };
      },
    },
    {
      type: '',
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
      validate: input => {
        if (input) {
          return true;
        } else {
          console.log('Add the department it belongs to.');
          return false;
        }
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

// add employee to the company_db
const addEmployee = () => {
  const sql = `INSERT INTO movies (movie_name) VALUES (?)`;
  const params = [body.movie_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
  runDatabase();
};

// --- Update Employee Database ---

// update an employee's role in the compnay_db
const updateEmployee = () => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
  runDatabase();
};

// --- Exit ---

// Exit function
const exit = () => {

}
