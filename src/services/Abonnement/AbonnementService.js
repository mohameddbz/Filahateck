const Abonnement = require('../../models/Abonement/Abonnement');
const { sequelize } = require('../../config/config');
const { QueryTypes } = require('sequelize');

const createAbonnement = async (data) => {
  return await Abonnement.create(data);
};

const getAllAbonnements = async () => {
  return await Abonnement.findAll();
};

const getAbonnementById = async (id) => {
  return await Abonnement.findByPk(id);
};

const updateAbonnement = async (id, data) => {
  return await Abonnement.update(data, { where: { id } });
};

const deleteAbonnement = async (id) => {
  return await Abonnement.destroy({ where: { id } });
};

const getAllDetailedEntries = async () => {
  const query = `
    SELECT 
      a.id AS abonnement_id, 
      a.nameAbonnement AS abonnement_name, 
      a.nameClient AS client_name, 
      a.prices, 
      a.createdAt AS abonnement_created_at, 
      a.updatedAt AS abonnement_updated_at,
      f.id AS fonctionnalities_id, 
      f.name AS fonctionnalities_name, 
      f.psudo AS fonctionnalities_psudo,
      i.id AS indice_id, 
      i.indiceName AS indice_name, 
      i.recomndation AS indice_recommendation, 
      i.description AS indice_description
    FROM abonnement a
    LEFT JOIN abonnementfonctionnalities af ON a.id = af.AbonnementId
    LEFT JOIN fonctionnalities f ON af.FonctionnalityId = f.id
    LEFT JOIN abonnement_indice ai ON a.id = ai.AbonnementId
    LEFT JOIN indice i ON ai.IndiceId = i.id
  `;

  try {
    const [results] = await sequelize.query(query);

    // Group abonnements, fonctionnalities, and indices efficiently
    const groupedResults = results.reduce((acc, row) => {
      const abonnementId = row.abonnement_id;

      // Ensure abonnement exists in the accumulator
      if (!acc[abonnementId]) {
        acc[abonnementId] = {
          id: abonnementId,
          nameAbonnement: row.abonnement_name,
          nameClient: row.client_name,
          prices: row.prices,
          createdAt: row.abonnement_created_at,
          updatedAt: row.abonnement_updated_at,
          fonctionnalities: [],
          indices: [],
        };
      }

      // Add fonctionnalities if they exist
      if (row.fonctionnalities_id) {
        const existingFunctionality = acc[abonnementId].fonctionnalities.find(
          f => f.id === row.fonctionnalities_id
        );
        if (!existingFunctionality) {
          acc[abonnementId].fonctionnalities.push({
            id: row.fonctionnalities_id,
            name: row.fonctionnalities_name,
            psudo: row.fonctionnalities_psudo,
          });
        }
      }

      // Add indices if they exist
      if (row.indice_id) {
        const existingIndice = acc[abonnementId].indices.find(
          i => i.id === row.indice_id
        );
        if (!existingIndice) {
          acc[abonnementId].indices.push({
            id: row.indice_id,
            name: row.indice_name,
            recommendation: row.indice_recommendation,
            description: row.indice_description,
          });
        }
      }

      return acc;
    }, {});

    // Return the formatted result as an array
    return Object.values(groupedResults);
  } catch (error) {
    throw new Error(`Error fetching detailed entries: ${error.message}`);
  }
};



module.exports = {
  createAbonnement,
  getAllAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement,
  getAllDetailedEntries
};
