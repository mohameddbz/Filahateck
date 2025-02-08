// services/indiceService.js
const Indice = require('../../models/Precision/Indice');
const { sequelize } = require('../../config/config');

// Create a new Indice
const createIndice = async (data) => {
  try {
    const indice = await Indice.create(data);
    return indice;
  } catch (error) {
    throw new Error('Error creating indice: ' + error.message);
  }
};

// Get all Indices
const getAllIndices = async () => {
  try {
    const indices = await Indice.findAll();
    return indices;
  } catch (error) {
    throw new Error('Error fetching indices: ' + error.message);
  }
};

// Get a single Indice by ID
const getIndiceById = async (id) => {
  try {
    const indice = await Indice.findByPk(id);
    if (!indice) {
      throw new Error('Indice not found');
    }
    return indice;
  } catch (error) {
    throw new Error('Error fetching indice: ' + error.message);
  }
};

// Update an Indice by ID
const updateIndice = async (id, data) => {
  try {
    const indice = await Indice.findByPk(id);
    if (!indice) {
      throw new Error('Indice not found');
    }
    await indice.update(data);
    return indice;
  } catch (error) {
    throw new Error('Error updating indice: ' + error.message);
  }
};

// Delete an Indice by ID
const deleteIndice = async (id) => {
  try {
    const indice = await Indice.findByPk(id);
    if (!indice) {
      throw new Error('Indice not found');
    }
    await indice.destroy();
    return { message: 'Indice deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting indice: ' + error.message);
  }
};

const fetchUserIndices = async (userId) => {
  try {
    const query = `
      SELECT 
        i.id AS indiceId,
        i.indiceName,
        i.recomndation,
        i.description,
        l.id AS legendeId,
        l.intervalDeb,
        l.intervalFin,
        l.descriptionLeg,
        l.color,
        p.id AS parcelleId,
        p.identifiantU,
        p.bEN,
        p.bES,
        p.bWN,
        p.bWS
      FROM 
        indice i
      JOIN  
        abonnement_indice ai ON i.id = ai.IndiceId
      JOIN 
        abonnementusers au ON au.abn_id = ai.AbonnementId
      JOIN 
        users u ON u.id = au.user_id
      LEFT JOIN 
        legende l ON l.indiceId = i.id
      JOIN
        parcelle p ON p.userId = u.id  -- Joining the parcelle table on userId
      WHERE 
        u.id = :userId;
    `;

    // Execute the query and get the results
    const results = await sequelize.query(query, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    // Check if the results are an array and handle them properly
    if (!Array.isArray(results)) {
      throw new Error('Expected an array of results, but got something else.');
    }

    // Group the results by indiceId
    const indices = results.reduce((acc, curr) => {
      const { 
        indiceId, 
        indiceName, 
        recomndation, 
        description, 
        legendeId, 
        intervalDeb, 
        intervalFin, 
        color, 
        descriptionLeg,
        parcelleId,
        identifiantU,
        bEN,
        bES,
        bWN,
        bWS
      } = curr;

      // Check if the indice already exists in the accumulator
      let indice = acc.find(i => i.indiceId === indiceId);

      if (!indice) {
        // If the indice doesn't exist, create a new one
        indice = {
          indiceId,
          indiceName,
          recomndation,
          description,
          legende: [],
          parcelles: [], // Adding the parcelles array to each indice
        };
        acc.push(indice);
      }

      // Add the legende data if it exists
      if (legendeId) {
        indice.legende.push({ legendeId, intervalDeb, intervalFin, color, descriptionLeg });
      }

      // Add the parcelle data if it exists
      if (parcelleId) {
        // Deduplicate parcelles by using 'identifiantU' as the unique key
        const existingParcelle = indice.parcelles.find(p => p.identifiantU === identifiantU);
        if (!existingParcelle) {
          indice.parcelles.push({
            parcelleId,
            identifiantU,
            bEN,
            bES,
            bWN,
            bWS
          });
        }
      }

      return acc;
    }, []);

    return indices;
  } catch (error) {
    console.error('Error fetching indices:', error);
    throw error;
  }
};


// next step recuperer les info de parcell in front 


module.exports = {
  createIndice,
  getAllIndices,
  getIndiceById,
  updateIndice,
  deleteIndice,
  fetchUserIndices
};
