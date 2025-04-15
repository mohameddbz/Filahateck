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
    type: DataTypes.FLOAT, // Changed from INTEGER to FLOAT (coordinates need decimals)
    allowNull: true,
  },
  bES: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  bWN: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  bWS: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Make sure this matches the actual table name
      key: 'id',
    },
  },
  geom: {
    type: DataTypes.GEOMETRY('POLYGON'), // Spatial data type for polygons
    allowNull: false,
  },
}, {
  tableName: 'parcelle',
  timestamps: false,
});

// Define the relationship between Parcelle and User
Parcelle.belongsTo(User, { foreignKey: 'userId', as: 'owner' }); 
User.hasMany(Parcelle, { foreignKey: 'userId' });

module.exports = Parcelle;
