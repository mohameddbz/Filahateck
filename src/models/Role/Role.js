const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/config'); // Assuming you have a sequelize setup
const User = require('./../User/User');

const Role = sequelize.define('Role', {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false ,
        unique: true,
    },
}, {
    tableName: 'roles',
    timestamps: false,  // No need for createdAt/updatedAt fields
});


module.exports = Role;
