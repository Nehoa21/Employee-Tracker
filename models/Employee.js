const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Employee extends Model {}

Employee.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.VARCHAR(30)
        },
        last_name: {
            type: DataTypes.VARCHAR(30)
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Role',
                key: 'id'
            }
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Employee'
    }
);

modules.exports = Employee;