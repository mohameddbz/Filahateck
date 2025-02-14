const SellerAbonnementService = require('../../services/Abonnement/SellerAbonnementService');

// Créer un nouvel abonnement
const createAbonnement = async (req, res) => {
  try {
    const result = await SellerAbonnementService.createAbonnement(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les abonnements
const getAllAbonnements = async (req, res) => {
  try {
    const result = await SellerAbonnementService.getAllAbonnements();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un abonnement par son ID
const getAbonnementById = async (req, res) => {
  try {
    const result = await SellerAbonnementService.getAbonnementById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Abonnement not found' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un abonnement
const updateAbonnement = async (req, res) => {
  try {
    const updated = await SellerAbonnementService.updateAbonnement(req.params.id, req.body);
    if (!updated[0]) return res.status(404).json({ message: 'Abonnement not found' });

    const updatedAbonnement = await SellerAbonnementService.getAbonnementById(req.params.id);
    res.status(200).json({
      message: 'Abonnement updated successfully',
      updatedAbonnement,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un abonnement
const deleteAbonnement = async (req, res) => {
  try {
    const deleted = await SellerAbonnementService.deleteAbonnement(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Abonnement not found' });

    res.status(200).json({ message: 'Abonnement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAbonnement,
  getAllAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement,
};