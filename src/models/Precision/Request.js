const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const User = require('./../User/User');
const Indice = require('./Indice');
const Parcelle = require('./Parcelle');

const Request = sequelize.define(
    'Request',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dateDebut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dateFin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  
  Request.belongsTo(User, { foreignKey: 'user_id', allowNull: false });
  User.hasMany(Request, { foreignKey: 'user_id' });
  
  Request.belongsTo(Indice, { foreignKey: 'indice_id', allowNull: false });
  Indice.hasMany(Request, { foreignKey: 'indice_id' });
  
  Request.belongsTo(Parcelle, { foreignKey: 'parcelle_id', allowNull: false });
  Parcelle.hasMany(Request, { foreignKey: 'parcelle_id' });

module.exports = Request;
