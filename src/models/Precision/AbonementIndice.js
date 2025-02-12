// AbonnementIndice.js (Junction Table)
const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const Abonnement = require('./../Abonement/Abonnement');
const Indice = require('./../Precision/Indice');

const AbonnementIndice = sequelize.define('AbonnementIndice', {
    AbonnementId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Abonnement', // Reference to the Abonnement model
        key: 'id',
      },
    },
    IndiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Indice', // Reference to the Indice model
        key: 'id',
      },
    },
    nombre_de_requete: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'abonnement_indice', // Name of the junction table
    timestamps: false, // Optional: disable timestamps if not needed
  });

  Indice.belongsToMany(Abonnement, {
    through: AbonnementIndice, 
    foreignKey: 'IndiceId',
    otherKey: 'AbonnementId',
    as: 'abonnements',  // Optional alias for easy querying
  });

  Abonnement.belongsToMany(Indice, {
    through: AbonnementIndice, 
    foreignKey: 'AbonnementId',
    otherKey: 'IndiceId',
    as: 'indices',  // Optional alias for easy querying
  });
  
  module.exports = AbonnementIndice;
