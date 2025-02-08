const parcelleService = require('../../services/Precision/parcelleService');

// Create a new Parcelle
const createParcelle = async (req, res) => {
  try {
    const parcelleData = req.body;

    // Ensure userId is passed in the request body
    if (!parcelleData.userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const parcelle = await parcelleService.createParcelle(parcelleData);
    return res.status(201).json(parcelle);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all Parcelles
const getAllParcelles = async (req, res) => {
  try {
    const parcelles = await parcelleService.getAllParcelles();
    return res.status(200).json(parcelles);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get a single Parcelle by ID
const getParcelleById = async (req, res) => {
  try {
    const { id } = req.params;
    const parcelle = await parcelleService.getParcelleById(id);
    return res.status(200).json(parcelle);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Update a Parcelle by ID
const updateParcelle = async (req, res) => {
  try {
    const { id } = req.params;
    const parcelleData = req.body;

    // If updating userId, ensure it's passed and valid
    if (parcelleData.userId) {
      const user = await require('../../models/User/User').findByPk(parcelleData.userId);
      if (!user) {
        return res.status(400).json({ message: 'Invalid userId provided' });
      }
    }

    const parcelle = await parcelleService.updateParcelle(id, parcelleData);
    return res.status(200).json(parcelle);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a Parcelle by ID
const deleteParcelle = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await parcelleService.deleteParcelle(id);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createParcelle,
  getAllParcelles,
  getParcelleById,
  updateParcelle,
  deleteParcelle
};
