// controllers/abonnementIndiceController.js
const abonnementIndiceService = require('../../services/Precision/abonnementIndiceService');

// Create a new AbonnementIndice
const createAbonnementIndice = async (req, res) => {
  try {
    const abonnementIndiceData = req.body;
    const abonnementIndice = await abonnementIndiceService.createAbonnementIndice(abonnementIndiceData);
    return res.status(201).json(abonnementIndice);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all AbonnementIndices
const getAllAbonnementIndices = async (req, res) => {
  try {
    const abonnementIndices = await abonnementIndiceService.getAllAbonnementIndices();
    return res.status(200).json(abonnementIndices);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get a single AbonnementIndice by ID
const getAbonnementIndiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const abonnementIndice = await abonnementIndiceService.getAbonnementIndiceById(id);
    return res.status(200).json(abonnementIndice);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Delete an AbonnementIndice by ID
const deleteAbonnementIndice = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await abonnementIndiceService.deleteAbonnementIndice(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAbonnementIndice,
  getAllAbonnementIndices,
  getAbonnementIndiceById,
  deleteAbonnementIndice
};
