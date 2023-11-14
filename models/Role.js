const { Model, DataTypes } = require('sequalize');
const sequalize = require('../config/connection.js');

class Role extends Model {}

Role.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.VARCHAR(30)
        },
        salary: {
            type: DataTypes.DECIMAL
        },
        department_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Department',
                key: 'id'
            }
        }
    },
    {
        sequalize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Role'
    }
);

modules.exports = Role;