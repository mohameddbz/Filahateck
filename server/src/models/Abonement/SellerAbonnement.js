const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');

// Définition du modèle Abonnement
const SellerAbonnement = sequelize.define('SellerAbonnement', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nameAbonnement: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Garantit que le nom de l'abonnement est unique
  },
  nameClient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING, // Utilisation de DECIMAL pour les prix
    allowNull: false
  },
  isLimited: {  // ntesti biha ida nombre d'annonce limiter ou non 
    type: DataTypes.BOOLEAN, // Booléen pour indiquer si l'abonnement est limité
    allowNull: false,
    defaultValue: false // Valeur par défaut : false (illimité)
  },
  nbPost: {
    type: DataTypes.INTEGER, // Nombre de posts autorisés
    allowNull: true // Peut être null si l'abonnement est illimité
  },
  priority: {
    type: DataTypes.INTEGER, // Priorité de l'abonnement
    allowNull: false,
    defaultValue: 1 // Valeur par défaut : 1 (priorité normale)
  }
}, {
  tableName: 'sellerAbonnement', // Nom de la table en minuscules
  timestamps: false // Désactive les champs `createdAt` et `updatedAt`
});

// Exportation du modèle
module.exports = SellerAbonnement;