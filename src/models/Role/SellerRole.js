const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/config'); 
const UserSellerRole = require('./../User/UserSellerRole');

const SellerRole = sequelize.define('SellerRole', {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false ,
        unique: true,
    },
}, {
    tableName: 'seller_roles',
    timestamps: false,  
});




module.exports = SellerRole;
