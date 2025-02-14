const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');
const User = require('./User'); // Assurez-vous que le chemin est correct
const SellerRole = require('./../Role/SellerRole'); // Assurez-vous que le chemin est correct

// Définir la table de jointure UserSellerRole
const UserSellerRole = sequelize.define('UserSellerRole', {
  userId: { // Utilisez camelCase pour la clé étrangère
    type: DataTypes.INTEGER,
    references: {
      model: User, // Référence au modèle User
      key: 'id',
    },
  },
  sellerRoleId: { // Utilisez camelCase pour la clé étrangère
    type: DataTypes.INTEGER,
    references: {
      model: SellerRole, // Référence au modèle SellerRole
      key: 'id',
    },
  },
}, {
  tableName: 'user_seller_roles', // Nom de la table dans la base de données
  timestamps: false, // Désactiver les colonnes createdAt et updatedAt
});

// Définir les relations many-to-many
User.belongsToMany(SellerRole, {
  through: UserSellerRole, // Utiliser la table de jointure UserSellerRole
  foreignKey: 'userId', // Utilisez camelCase pour correspondre au modèle
  otherKey: 'sellerRoleId', // Utilisez camelCase pour correspondre au modèle
  as: 'sellerRoles', // Alias pour accéder aux rôles de vendeur d'un utilisateur
});

SellerRole.belongsToMany(User, {
  through: UserSellerRole, // Utiliser la table de jointure UserSellerRole
  foreignKey: 'sellerRoleId', // Utilisez camelCase pour correspondre au modèle
  otherKey: 'userId', // Utilisez camelCase pour correspondre au modèle
  as: 'users', // Alias pour accéder aux utilisateurs ayant ce rôle de vendeur
});

module.exports = UserSellerRole;