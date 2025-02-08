const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/config'); 

const Role = sequelize.define('Role', {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false ,
        unique: true,
    },
}, {
    tableName: 'roles',
    timestamps: false,  
});


module.exports = Role;
