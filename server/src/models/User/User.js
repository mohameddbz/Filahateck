const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const Role = require('./../Role/Role');

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wilaya: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

User.belongsTo(Role, { foreignKey: 'role_id', allowNull: false });
Role.hasMany(User, { foreignKey: 'role_id' });

module.exports = User;
