const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Department extends Model {}

Department.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.VARCHAR(30)
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Department'
    }
);

modules.exports = Department;