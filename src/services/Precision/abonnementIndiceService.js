// services/abonnementIndiceService.js
const AbonnementIndice = require('../../models/Precision/AbonementIndice');

// Create a new AbonnementIndice
const createAbonnementIndice = async (data) => {
  try {
    const abonnementIndice = await AbonnementIndice.create(data);
    return abonnementIndice;
  } catch (error) {
    throw new Error('Error creating abonnement-indice association: ' + error.message);
  }
};

// Get all AbonnementIndices
const getAllAbonnementIndices = async () => {
  try {
    const abonnementIndices = await AbonnementIndice.findAll();
    return abonnementIndices;
  } catch (error) {
    throw new Error('Error fetching abonnement-indice associations: ' + error.message);
  }
};

// Get a single AbonnementIndice by ID
const getAbonnementIndiceById = async (id) => {
  try {
    const abonnementIndice = await AbonnementIndice.findByPk(id);
    if (!abonnementIndice) {
      throw new Error('AbonnementIndice not found');
    }
    return abonnementIndice;
  } catch (error) {
    throw new Error('Error fetching abonnement-indice association: ' + error.message);
  }
};

// Delete an AbonnementIndice by ID
const deleteAbonnementIndice = async (id) => {
  try {
    const abonnementIndice = await AbonnementIndice.findByPk(id);
    if (!abonnementIndice) {
      throw new Error('AbonnementIndice not found');
    }
    await abonnementIndice.destroy();
    return { message: 'AbonnementIndice deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting abonnement-indice association: ' + error.message);
  }
};

module.exports = {
  createAbonnementIndice,
  getAllAbonnementIndices,
  getAbonnementIndiceById,
  deleteAbonnementIndice
};
