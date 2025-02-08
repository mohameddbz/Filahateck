// Fonctionnalities.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');

const Fonctionnalities = sequelize.define('Fonctionnalities', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  psudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'fonctionnalities',
});


module.exports = Fonctionnalities;
