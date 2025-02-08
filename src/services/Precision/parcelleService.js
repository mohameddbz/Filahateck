const Parcelle = require('../../models/Precision/Parcelle');

// Create a new Parcelle
const createParcelle = async (data) => {
  try {
    // Ensure userId is included in the data
    const parcelle = await Parcelle.create(data);
    return parcelle;
  } catch (error) {
    throw new Error('Error creating parcelle: ' + error.message);
  }
};

// Get all Parcelles, optionally including the related User data
const getAllParcelles = async () => {
  try {
    const parcelles = await Parcelle.findAll({
      include: [
        {
          model: require('../../models/User/User'), // Include related User model
          as: 'user',
          attributes: ['id', 'userName', 'email'], // Optionally, select the attributes you need from the User
        },
      ],
    });
    return parcelles;
  } catch (error) {
    throw new Error('Error fetching parcelles: ' + error.message);
  }
};

// Get a single Parcelle by ID, including related User data
const getParcelleById = async (id) => {
  try {
    const parcelle = await Parcelle.findByPk(id, {
      include: [
        {
          model: require('../../models/User/User'), // Include related User model
          as: 'user',
          attributes: ['id', 'userName', 'email'], // Optionally, select the attributes you need from the User
        },
      ],
    });

    if (!parcelle) {
      throw new Error('Parcelle not found');
    }
    return parcelle;
  } catch (error) {
    throw new Error('Error fetching parcelle: ' + error.message);
  }
};

// Update a Parcelle by ID
const updateParcelle = async (id, data) => {
  try {
    const parcelle = await Parcelle.findByPk(id);
    if (!parcelle) {
      throw new Error('Parcelle not found');
    }

    // If userId is being updated, ensure the correct User exists
    if (data.userId) {
      const user = await require('../../models/User/User').findByPk(data.userId);
      if (!user) {
        throw new Error('User not found');
      }
    }

    await parcelle.update(data);
    return parcelle;
  } catch (error) {
    throw new Error('Error updating parcelle: ' + error.message);
  }
};

// Delete a Parcelle by ID
const deleteParcelle = async (id) => {
  try {
    const parcelle = await Parcelle.findByPk(id);
    if (!parcelle) {
      throw new Error('Parcelle not found');
    }
    await parcelle.destroy();
    return { message: 'Parcelle deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting parcelle: ' + error.message);
  }
};

module.exports = {
  createParcelle,
  getAllParcelles,
  getParcelleById,
  updateParcelle,
  deleteParcelle,
};
