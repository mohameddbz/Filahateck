const AbonnementUserService = require('../../services/Abonnement/AbonnementUserService');

// Create a new AbonnementUser
const createAbonnementUser = async (req, res) => {
  try {
    const { abn_id, user_id, date_abonnement, durée, etat } = req.body;
    const newAbonnementUser = await AbonnementUserService.createAbonnementUser({
      abn_id,
      user_id,
      date_abonnement,
      durée,
      etat,
    });
    res.status(201).json(newAbonnementUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all AbonnementUsers
const getAllAbonnementUsers = async (req, res) => {
  try {
    const abonnementUsers = await AbonnementUserService.getAllAbonnementUsers();
    res.status(200).json(abonnementUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an AbonnementUser by its ID
const getAbonnementUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const abonnementUser = await AbonnementUserService.getAbonnementUserById(id);
    if (!abonnementUser) {
      return res.status(404).json({ message: 'AbonnementUser not found' });
    }
    res.status(200).json(abonnementUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the abonnement for a specific user by user_id
const getAbonnementStatusByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const abonnementUser = await AbonnementUserService.getAbonnementByUserId(userId);
    if (!abonnementUser) {
      return res.status(404).json({ message: 'Aucun abonnement trouvé pour cet utilisateur' });
    }
    res.status(200).json(abonnementUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an AbonnementUser
const updateAbonnementUser = async (req, res) => {
  const { id } = req.params;
  const { abn_id, user_id, date_abonnement, durée, etat } = req.body;
  try {
    const updated = await AbonnementUserService.updateAbonnementUser(id, {
      abn_id,
      user_id,
      date_abonnement,
      durée,
      etat,
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'AbonnementUser not found' });
    }
    res.status(200).json({ message: 'AbonnementUser updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an AbonnementUser
const deleteAbonnementUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await AbonnementUserService.deleteAbonnementUser(id);
    if (result === 0) {
      return res.status(404).json({ message: 'AbonnementUser not found' });
    }
    res.status(200).json({ message: 'AbonnementUser deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAbonnementUser,
  getAllAbonnementUsers,
  getAbonnementUserById,
  getAbonnementStatusByUserId,
  updateAbonnementUser,
  deleteAbonnementUser,
};
