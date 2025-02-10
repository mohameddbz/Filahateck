const AbonnementService = require('../../services/Abonnement/AbonnementService');

const createAbonnement = async (req, res) => {
  try {
    const result = await AbonnementService.createAbonnement(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAbonnements = async (req, res) => {
  try {
    const result = await AbonnementService.getAllAbonnements();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAbonnementById = async (req, res) => {
  try {
    const result = await AbonnementService.getAbonnementById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Abonnement not found' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAbonnement = async (req, res) => {
  try {
    const updated = await AbonnementService.updateAbonnement(req.params.id, req.body);
    const updatedAbonnement = await AbonnementService.getAbonnementById(req.params.id);
    res.status(200).json({
      message: 'Abonnement updated successfully',
      updatedAbonnement,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAbonnement = async (req, res) => {
  try {
    await AbonnementService.deleteAbonnement(req.params.id);
    res.status(200).json({ message: 'Abonnement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAbonnementDetails = async (req, res) => {
  try {
    const data = await AbonnementService.getAllDetailedEntries();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAbonnement,
  getAllAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement,
  getAbonnementDetails
};
