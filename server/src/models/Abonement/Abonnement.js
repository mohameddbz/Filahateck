// Abonnement.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');


const Abonnement = sequelize.define('Abonnement', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nameAbonnement: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nameClient: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  prices: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
}, {
  tableName: 'abonnement', // Force lowercase table name
});


module.exports = Abonnement;
