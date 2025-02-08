const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const Indice = require('./Indice');

const Legende = sequelize.define('Legende', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  intervalDeb: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  intervalFin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionLeg: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  indiceId: {
    type: DataTypes.INTEGER,
    references: {
      model: Indice,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'legende',
  timestamps: false,
});

Indice.hasMany(Legende, { foreignKey: 'indiceId', as: 'legendes' });
Legende.belongsTo(Indice, { foreignKey: 'indiceId', as: 'indice' });

module.exports = Legende;
