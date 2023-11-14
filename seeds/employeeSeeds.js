const sequelize = require('../config/connection.js');

const Employee = require('../models/Employee.js');
const employeeSeedsJson = require('./employeeSeedsJson.json');

const employeeDatabase = async () => {
    await sequelize.sync({ force: true });
    await Employee.bulkCreate(employeeSeedsJson);

    process.exit(0);
};

employeeDatabase();