const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');
const Abonnement = require('./Abonnement');  
const User = require('./../User/User'); 

const AbonnementUser = sequelize.define('AbonnementUser', {
  date_abonnement: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  durée: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  etat: {
    type: DataTypes.ENUM('actif', 'désactivé'),
    allowNull: false,
  },
  abn_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Abonnement,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }
});

// Relations
AbonnementUser.belongsTo(Abonnement, { foreignKey: 'abn_id' });
AbonnementUser.belongsTo(User, { foreignKey: 'user_id' });
Abonnement.hasMany(AbonnementUser, { foreignKey: 'abn_id' });
User.hasMany(AbonnementUser, { foreignKey: 'user_id' });

module.exports = AbonnementUser;
