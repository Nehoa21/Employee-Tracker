const sequelize = require('../config/connection.js');

const Department = require('../models/Department.js');
const departmentSeedsJson = require('./departmentSeedsJson.json');

const departmentDatabase = async () => {
    await sequelize.sync({ force: true });
    await Department.bulkCreate(departmentSeedsJson);
    
    process.exit(0);
};

departmentDatabase();