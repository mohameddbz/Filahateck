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
    defaultValue: 0,
    allowNull: true,
  },
  etat: {
    type: DataTypes.ENUM('actif', 'désactivé'),
    allowNull: false,
  },
  sellerAbonnementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SellerAbonnement,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  }
});



SellerAbonnementUser.belongsTo(SellerAbonnement, { foreignKey: 'sellerAbonnementId' });
SellerAbonnementUser.belongsTo(User, { foreignKey: 'userId' });
SellerAbonnement.hasMany(SellerAbonnementUser, { foreignKey: 'sellerAbonnementId' });
User.hasMany(SellerAbonnementUser, { foreignKey: 'userId' });

module.exports = SellerAbonnementUser;
