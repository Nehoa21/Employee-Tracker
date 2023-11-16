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

// --- View Databases ---

// view department data
const departmentData = () => {
  const sql = `SELECT * FROM department`;
  
  db.query(sql, (err, choice) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Viewing Department Table');
    console.table(choice);
  });
  init();
};

// view all role data
const roleData = () => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
};

// view all employee data
const employeeData = () => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
};

// --- Add to Databases ---

// add department to the company_db
const addDepartment = () => {
  app.post('/api/new-movie', ({ body }, res) => {
    const sql = `INSERT INTO movies (movie_name)
      VALUES (?)`;
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
  });
};

// add role to the company_db
const addRole = () => {
  app.post('/api/new-movie', ({ body }, res) => {
    const sql = `INSERT INTO movies (movie_name)
      VALUES (?)`;
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
  });
};

// add employee to the company_db
const addEmployee = () => {
  app.post('/api/new-movie', ({ body }, res) => {
    const sql = `INSERT INTO movies (movie_name)
      VALUES (?)`;
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
  });
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
};

// --- Exit ---

// Exit function
const exit = () => {

}

init();
