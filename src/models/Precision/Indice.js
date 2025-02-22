const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');

const Indice = sequelize.define('Indice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  indiceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recomndation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'indice',
  timestamps: false,
});

module.exports = Indice;
