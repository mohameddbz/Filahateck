const parcelleService = require('../../services/Precision/parcelleService');

// Create a new Parcelle
const createParcelle = async (req, res) => {
  try {
    const parcelleData = req.body;

    if (!parcelleData.userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const parcelle = await parcelleService.createParcelle(parcelleData);
    return res.status(201).json(parcelle);
  } catch (error) {
    return res.status(400).json({ message: `Error creating parcelle: ${error.message}` });
  }
};

// Get all Parcelles
const getAllParcelles = async (req, res) => {
  try {
    const parcelles = await parcelleService.getAllParcelles();
    return res.status(200).json(parcelles);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching parcelles: ${error.message}` });
  }
};

// Get a single Parcelle by ID
const getParcelleById = async (req, res) => {
  try {
    const { id } = req.params;
    const parcelle = await parcelleService.getParcelleById(id);
    return res.status(200).json(parcelle);
  } catch (error) {
    return res.status(404).json({ message: `Parcelle not found: ${error.message}` });
  }
};

// Get Parcelles by userId
const getParcellesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const parcelles = await parcelleService.getParcellesByUserId(userId);
    
    if (!parcelles.length) {
      return res.status(404).json({ message: `No parcelles found for userId: ${userId}` });
    }

    return res.status(200).json(parcelles);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching parcelles: ${error.message}` });
  }
};

// Update a Parcelle by ID
const updateParcelle = async (req, res) => {
  try {
    const { id } = req.params;
    const parcelleData = req.body;

    if (parcelleData.userId) {
      const user = await require('../../models/User/User').findByPk(parcelleData.userId);
      if (!user) {
        return res.status(400).json({ message: 'Invalid userId provided' });
      }
    }

    const parcelle = await parcelleService.updateParcelle(id, parcelleData);
    return res.status(200).json(parcelle);
  } catch (error) {
    return res.status(400).json({ message: `Error updating parcelle: ${error.message}` });
  }
};

// Delete a Parcelle by ID
const deleteParcelle = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await parcelleService.deleteParcelle(id);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(404).json({ message: `Error deleting parcelle: ${error.message}` });
  }
};

module.exports = {
  createParcelle,
  getAllParcelles,
  getParcelleById,
  getParcellesByUserId,
  updateParcelle,
  deleteParcelle,
};
