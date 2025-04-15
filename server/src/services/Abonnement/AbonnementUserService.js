const AbonnementUser = require('../../models/Abonement/AbonnementUser');
const Abonnement = require('../../models/Abonement/Abonnement');
const User = require('../../models/User/User');

// Create a new AbonnementUser
const createAbonnementUser = async (data) => {
  try {
    const abonnementUser = await AbonnementUser.create(data);
    return abonnementUser;
  } catch (error) {
    throw new Error('Error creating abonnement user: ' + error.message);
  }
};

// Get all AbonnementUsers
const getAllAbonnementUsers = async () => {
  try {
    const abonnementUsers = await AbonnementUser.findAll({
      include: [Abonnement, User],
    });
    return abonnementUsers;
  } catch (error) {
    throw new Error('Error fetching abonnement users: ' + error.message);
  }
};

// Get an AbonnementUser by ID
const getAbonnementUserById = async (id) => {
  try {
    const abonnementUser = await AbonnementUser.findOne({
      where: { id },
      include: [Abonnement, User],
    });
    return abonnementUser;
  } catch (error) {
    throw new Error('Error fetching abonnement user by id: ' + error.message);
  }
};

// Get the abonnement for a specific user by user_id
const getAbonnementByUserId = async (userId) => {
  try {
    const abonnementUsers = await AbonnementUser.findAll({
      where: { user_id: userId },
      include: [Abonnement, User],
    });
    return abonnementUsers;
  } catch (error) {
    throw new Error('Error fetching abonnement for user: ' + error.message);
  }
};


// Update an AbonnementUser
const updateAbonnementUser = async (id, data) => {
  try {
    const updated = await AbonnementUser.update(data, {
      where: { id },
    });
    return updated;
  } catch (error) {
    throw new Error('Error updating abonnement user: ' + error.message);
  }
};

// Delete an AbonnementUser
const deleteAbonnementUser = async (id) => {
  try {
    const result = await AbonnementUser.destroy({
      where: { id },
    });
    return result;
  } catch (error) {
    throw new Error('Error deleting abonnement user: ' + error.message);
  }
};

module.exports = {
  createAbonnementUser,
  getAllAbonnementUsers,
  getAbonnementUserById,
  getAbonnementByUserId,
  updateAbonnementUser,
  deleteAbonnementUser,
};
