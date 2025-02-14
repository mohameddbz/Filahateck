const User = require('../../models/User/User');
const SellerAbonnement = require('./../../models/Abonement/SellerAbonnement');  
const SellerAbonnementUser = require('./../../models/Abonement/SellerAbonnementUser');  

// Créer un nouvel enregistrement SellerAbonnementUser
const createSellerAbonnementUser = async (data) => {
  try {
    const sellerAbonnementUser = await SellerAbonnementUser.create(data);
    return sellerAbonnementUser;
  } catch (error) {
    throw new Error('Erreur lors de la création de SellerAbonnementUser : ' + error.message);
  }
};

// Récupérer tous les enregistrements SellerAbonnementUser
const getAllSellerAbonnementUsers = async () => {
  try {
    const sellerAbonnementUsers = await SellerAbonnementUser.findAll({
      include: [SellerAbonnement, User], // Inclure les modèles associés
    });
    return sellerAbonnementUsers;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des SellerAbonnementUsers : ' + error.message);
  }
};

// Récupérer un SellerAbonnementUser par son ID
const getSellerAbonnementUserById = async (id) => {
  try {
    const sellerAbonnementUser = await SellerAbonnementUser.findOne({
      where: { id },
      include: [SellerAbonnement, User], // Inclure les modèles associés
    });
    return sellerAbonnementUser;
  } catch (error) {
    throw new Error('Erreur lors de la récupération de SellerAbonnementUser par ID : ' + error.message);
  }
};

// Mettre à jour un SellerAbonnementUser
const updateSellerAbonnementUser = async (id, data) => {
  try {
    const [updated] = await SellerAbonnementUser.update(data, {
      where: { id },
    });
    if (!updated) throw new Error('SellerAbonnementUser non trouvé');
    return updated;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de SellerAbonnementUser : ' + error.message);
  }
};

// Supprimer un SellerAbonnementUser
const deleteSellerAbonnementUser = async (id) => {
  try {
    const result = await SellerAbonnementUser.destroy({
      where: { id },
    });
    if (!result) throw new Error('SellerAbonnementUser non trouvé');
    return result;
  } catch (error) {
    throw new Error('Erreur lors de la suppression de SellerAbonnementUser : ' + error.message);
  }
};

module.exports = {
  createSellerAbonnementUser,
  getAllSellerAbonnementUsers,
  getSellerAbonnementUserById,
  updateSellerAbonnementUser,
  deleteSellerAbonnementUser,
};