const User = require('../../models/User/User');
const SellerAbonnement = require('./../../models/Abonement/SellerAbonnement');  
const SellerAbonnementUser = require('./../../models/Abonement/SellerAbonnementUser');  
const Fonctionnalities = require ('./../../models/Abonement/Fonctionnalities')
const { Op } = require('sequelize');

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
    console.log(sellerAbonnementUsers);
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

const getCurrentSellerAbonnementUser = async (userId) => {
  try {
    const currentDate = new Date(); // Date actuelle

    const abonnement = await SellerAbonnementUser.findOne({
      where: {
        userId: userId,
        etat: 'actif',
        dateDebut: { [Op.lte]: currentDate }, // dateDebut ≤ currentDate
        dateFin: { [Op.gte]: currentDate }    // dateFin ≥ currentDate
      },
      include: [SellerAbonnement] // Inclure les infos de l'abonnement si besoin
    });

    return abonnement;
  } catch (error) {
    throw new Error('Erreur lors de la récupération de l\'abonnement actuel : ' + error.message);
  }
};
// const getCurrentSellerAbonnementUser = async (userId) => {
//   try {
//     const currentDate = new Date(); // Date actuelle

//     const abonnement = await SellerAbonnementUser.findOne({
//       where: {
//         userId: userId,
//         etat: 'actif',
//         dateDebut: { [Op.lte]: currentDate }, // dateDebut ≤ currentDate
//         dateFin: { [Op.gte]: currentDate }    // dateFin ≥ currentDate
//       },
//       include: [
//         {
//           model: SellerAbonnement, // Inclure les infos de l'abonnement
//           include: [
//             {
//               model: Fonctionnalities, // Inclure les fonctionnalités via la table de liaison
//               through: { attributes: [] } // Ne pas inclure les attributs de la table de liaison
//             }
//           ]
//         }
//       ]
//     });
//     console.log("abonnement is ----> ",abonnement);
//     return abonnement;
//   } catch (error) {
//     throw new Error('Erreur lors de la récupération de l\'abonnement actuel : ' + error.message);
//   }
// };
module.exports = {
  createSellerAbonnementUser,
  getAllSellerAbonnementUsers,
  getSellerAbonnementUserById,
  updateSellerAbonnementUser,
  deleteSellerAbonnementUser,
  getCurrentSellerAbonnementUser
};