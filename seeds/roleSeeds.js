const sequalize = require('../config/connection.js');

const Role = require('../models/Role.js');
const roleSeedsJson = require('./roleSeedsJson.json');

const roleDatabase = async () => {
    await sequalize.sync({ force: true });
    await Role.bulkCreate(roleSeedsJson);

    process.exit(0);
};

roleDatabase();