const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');
const SellerAbonnement = require('./SellerAbonnement'); // Importez le modèle SellerAbonnement
const User = require('./../User/User'); // Importez le modèle User

const SellerAbonnementUser = sequelize.define('SellerAbonnementUser', {
  dateDebut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nbPost: {
    type: DataTypes.INTEGER,
    allowNull: true, // Peut être null si illimité
  },
  etat: {
    type: DataTypes.ENUM('actif', 'désactivé'),
    allowNull: false,
  },
  sellerAbonnementId: {
    type: DataTypes.INTEGER,
    references: {
      model: SellerAbonnement, // Référence à la table SellerAbonnement
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Référence à la table User
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }
});

// Relations
SellerAbonnementUser.belongsTo(SellerAbonnement, { foreignKey: 'sellerAbonnementId' });
SellerAbonnementUser.belongsTo(User, { foreignKey: 'userId' });
SellerAbonnement.hasMany(SellerAbonnementUser, { foreignKey: 'sellerAbonnementId' });
User.hasMany(SellerAbonnementUser, { foreignKey: 'userId' });

module.exports = SellerAbonnementUser;