// models/AbonnementFonctionnalities.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');
const Abonnement = require('./Abonnement');
const Fonctionnalities = require('./Fonctionnalities');

// Define the join table for many-to-many relationship
const AbonnementFonctionnalities = sequelize.define('AbonnementFonctionnalities', {
  AbonnementId: {
    type: DataTypes.INTEGER,
    references: {
      model: Abonnement,  // Proper reference to the Sequelize model
      key: 'id',
    },
  },
  FonctionnalityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Fonctionnalities,  // Proper reference to the Sequelize model
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

// Define the many-to-many relationships
Abonnement.belongsToMany(Fonctionnalities, {
  through: AbonnementFonctionnalities,
  foreignKey: 'AbonnementId',
  otherKey: 'FonctionnalityId',
  as: 'fonctionnalities',
});

Fonctionnalities.belongsToMany(Abonnement, {
  through: AbonnementFonctionnalities,
  foreignKey: 'FonctionnalityId',
  otherKey: 'AbonnementId',
  as: 'abonnement',
});

module.exports = AbonnementFonctionnalities;
