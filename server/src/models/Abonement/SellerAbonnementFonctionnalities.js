const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');
const SellerAbonnement = require('./SellerAbonnement');
const Fonctionnalities = require('./Fonctionnalities');

// Utiliser un nom de table très court
const SellerAbonnementFonctionnalities = sequelize.define('seller_abn_fonct', {
  sellerabonnementid: {
    type: DataTypes.INTEGER,
    references: {
      model: SellerAbonnement,
      key: 'id',
    },
  },
  fonctionnalityid: {
    type: DataTypes.INTEGER,
    references: {
      model: Fonctionnalities,
      key: 'id',
    },
  },
}, {
  timestamps: false,
  tableName: 'seller_abn_fonct', // Nom de table très court
  indexes: [
    {
      unique: true,
      fields: ['sellerabonnementid', 'fonctionnalityid'],
      name: 'unique_seller_fonct', // Nom de la contrainte raccourci
    },
  ],
});

// Définir les associations
SellerAbonnement.belongsToMany(Fonctionnalities, {
  through: SellerAbonnementFonctionnalities,
  foreignKey: 'sellerabonnementid',
  otherKey: 'fonctionnalityid',
  as: 'fonctionnalities',
});

Fonctionnalities.belongsToMany(SellerAbonnement, {
  through: SellerAbonnementFonctionnalities,
  foreignKey: 'fonctionnalityid',
  otherKey: 'sellerabonnementid',
  as: 'sellerabonnements',
});

module.exports = SellerAbonnementFonctionnalities;