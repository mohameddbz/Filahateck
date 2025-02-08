const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const User = require('../User/User');  

const Parcelle = sequelize.define('Parcelle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  identifiantU: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bEN: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bES: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bWN: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bWS: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Make sure the table name is in plural as 'Users'
      key: 'id',
    },
  },
}, {
  tableName: 'parcelle',
  timestamps: false,
});

// Define the relationship between Parcelle and User
Parcelle.belongsTo(User, { foreignKey: 'userId' }); // Each parcelle belongs to a user
User.hasMany(Parcelle, { foreignKey: 'userId' }); // A user can have many parcels

module.exports = Parcelle;
