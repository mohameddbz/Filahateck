const SellerAbonnement = require('../../models/Abonement/SellerAbonnement'); // Importez votre modèle SellerAbonnement
const { sequelize } = require('./../../config/config');
// Créer un nouvel abonnement
const createAbonnement = async (data) => {
  return await SellerAbonnement.create(data);
};

// Récupérer tous les abonnements
const getAllAbonnements = async () => {
  try {
    const query = `
      SELECT 
        sa.id AS sellerAbonnementId,
        sa.nameAbonnement,
        sa.nameClient,
        sa.price,
        sa.isLimited,
        sa.nbPost,
        sa.priority,
        f.id AS fonctionnalityId,
        f.name AS fonctionnalityName,
        f.psudo AS fonctionnalityPsudo
      FROM 
        sellerabonnement sa
      LEFT JOIN 
        seller_abn_fonct saf ON sa.id = saf.sellerabonnementid
      LEFT JOIN 
        fonctionnalities f ON saf.fonctionnalityid = f.id
    `;
    const [results] = await sequelize.query(query);

    // Grouper les résultats par abonnement
    const groupedResults = results.reduce((acc, row) => {
      const abonnementId = row.sellerAbonnementId;

      if (!acc[abonnementId]) {
        acc[abonnementId] = {
          id: abonnementId,
          nameAbonnement: row.nameAbonnement,
          nameClient: row.nameClient,
          price: row.price,
          isLimited: row.isLimited,
          nbPost: row.nbPost,
          priority: row.priority,
          fonctionnalities: [],
        };
      }

      if (row.fonctionnalityId) {
        acc[abonnementId].fonctionnalities.push({
          id: row.fonctionnalityId,
          name: row.fonctionnalityName,
          psudo: row.fonctionnalityPsudo,
        });
      }

      return acc;
    }, {});
    return Object.values(groupedResults);
  } catch (error) {
    console.log('Error in getAllAbonnements:', error);
    throw error;
  }
};

// Récupérer un abonnement par son ID
const getAbonnementById = async (id) => {
  return await SellerAbonnement.findByPk(id);
};

// Mettre à jour un abonnement
const updateAbonnement = async (id, data) => {
  return await SellerAbonnement.update(data, { where: { id } });
};

// Supprimer un abonnement
const deleteAbonnement = async (id) => {
  return await SellerAbonnement.destroy({ where: { id } });
};

module.exports = {
  createAbonnement,
  getAllAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement,
};