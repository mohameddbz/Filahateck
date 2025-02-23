const SellerAbonnementUserService = require('./../../services/Abonnement/SellerAbonnementUserService');

// Créer un nouvel enregistrement SellerAbonnementUser
const createSellerAbonnementUser = async (req, res) => {
  const userId = req.user.user_id; 
  try {
    const { sellerAbonnementId, dateDebut, dateFin, nbPost, etat } = req.body;
    const newSellerAbonnementUser = await SellerAbonnementUserService.createSellerAbonnementUser({
      sellerAbonnementId,
      userId,
      dateDebut,
      dateFin,
      nbPost,
      etat,
    });
    res.status(201).json(newSellerAbonnementUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les enregistrements SellerAbonnementUser
const getAllSellerAbonnementUsers = async (req, res) => {
  try {
    const sellerAbonnementUsers = await SellerAbonnementUserService.getAllSellerAbonnementUsers();
    res.status(200).json(sellerAbonnementUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un SellerAbonnementUser par son ID
const getSellerAbonnementUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const sellerAbonnementUser = await SellerAbonnementUserService.getSellerAbonnementUserById(id);
    if (!sellerAbonnementUser) {
      return res.status(404).json({ message: 'SellerAbonnementUser non trouvé' });
    }
    res.status(200).json(sellerAbonnementUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un SellerAbonnementUser
const updateSellerAbonnementUser = async (req, res) => {
  const { id } = req.params;
  const { sellerAbonnementId, userId, dateDebut, dateFin, nbPost, etat } = req.body;
  try {
    const updated = await SellerAbonnementUserService.updateSellerAbonnementUser(id, {
      sellerAbonnementId,
      userId,
      dateDebut,
      dateFin,
      nbPost,
      etat,
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'SellerAbonnementUser non trouvé' });
    }
    res.status(200).json({ message: 'SellerAbonnementUser mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un SellerAbonnementUser
const deleteSellerAbonnementUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SellerAbonnementUserService.deleteSellerAbonnementUser(id);
    if (result === 0) {
      return res.status(404).json({ message: 'SellerAbonnementUser non trouvé' });
    }
    res.status(200).json({ message: 'SellerAbonnementUser supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentSellerAbonnementUser = async (req, res) => {
  const { user_id } = req.user;  
  try {
    const sellerAbonnementUser = await SellerAbonnementUserService.getCurrentSellerAbonnementUser(user_id);
    if (!sellerAbonnementUser) {
      return res.status(404).json({
        hasActiveSubscription: false,
        message: "Aucun abonnement actif trouvé."
      });
    }

    return res.status(200).json({
      hasActiveSubscription: true,
      data: sellerAbonnementUser
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

module.exports = {
  createSellerAbonnementUser,
  getAllSellerAbonnementUsers,
  getSellerAbonnementUserById,
  updateSellerAbonnementUser,
  deleteSellerAbonnementUser,
  getCurrentSellerAbonnementUser
};                         