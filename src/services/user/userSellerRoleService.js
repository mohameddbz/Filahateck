const UserSellerRole = require('./../../models/User/UserSellerRole');
const SellerRole = require('./../../models/Role/SellerRole');

const createUserSellerRole = async (userId,sellerRoleId) => {
  
    return await UserSellerRole.create({
        userId,
        sellerRoleId
    });
  };
  const getSellerRoleOfUser = async (userId) => {
    try {
      // Étape 1 : Récupérer l'enregistrement de UserSellerRole
      const userSellerRole = await UserSellerRole.findOne({
        where: {
          userId, // Filtrer par userId
        },
      });
  
      if (!userSellerRole) {
        throw new Error('Aucun enregistrement trouvé pour cet utilisateur');
      }
  
      // Étape 2 : Récupérer les données de SellerRole en utilisant sellerRoleId
      const sellerRole = await SellerRole.findOne({
        where: {
          id: userSellerRole.sellerRoleId, // Filtrer par sellerRoleId
        },
      });
  
      if (!sellerRole) {
        throw new Error('Aucun rôle de vendeur trouvé pour cet ID');
      }
  
      // Retourner les données combinées
      return {
        userId: userSellerRole.userId,
        sellerRoleId: userSellerRole.sellerRoleId,
        sellerRole: {
          id: sellerRole.id,
          roleName: sellerRole.roleName,
        },
      };
    } catch (error) {
      console.log('Error in getSellerRoleOfUser:', error);
      throw error; // Propager l'erreur pour la gestion ultérieure
    }
  };

module.exports = {createUserSellerRole,getSellerRoleOfUser} 