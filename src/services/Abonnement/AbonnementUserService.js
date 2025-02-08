const  User  = require('../../models/User/User');
const  Abonnement  = require('../../models/Abonement/Abonnement');  
const  AbonnementUser  = require('../../models/Abonement/AbonnementUser');  

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
      include: [Abonnement, User], // Include associated models
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
      include: [Abonnement, User], // Include associated models
    });
    return abonnementUser;
  } catch (error) {
    throw new Error('Error fetching abonnement user by id: ' + error.message);
  }
};

// Update an AbonnementUser
const updateAbonnementUser = async (id, data) => {
  try {
    const abonnementUser = await AbonnementUser.update(data, {
      where: { id },
    });
    return abonnementUser;
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
  updateAbonnementUser,
  deleteAbonnementUser,
};
