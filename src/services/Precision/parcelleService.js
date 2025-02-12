const Parcelle = require('../../models/Precision/Parcelle');
const User = require('../../models/User/User');
const { sequelize } = require('../../config/config');

// Create a new Parcelle
const createParcelle = async (data) => {
  try {
    // Convert coordinates array to a WKT POLYGON string
    const polygonWKT = `POLYGON((${data.coordinates[0]
      .map(coord => `${coord[0]} ${coord[1]}`)
      .join(', ')}))`;

    const parcelle = await Parcelle.create({
      identifiantU: data.nomPercel, // Using `nomPercel` as `identifiantU`
      bEN: data.coordinates[0][0][0], // First point longitude
      bES: data.coordinates[0][1][0], // Second point longitude
      bWN: data.coordinates[0][2][0], // Third point longitude
      bWS: data.coordinates[0][3][0], // Fourth point longitude
      userId: data.userId,
      geom: sequelize.fn('ST_GeomFromText', polygonWKT), // Convert to POLYGON format
    });

    return parcelle;
  } catch (error) {
    throw new Error('Error creating parcelle: ' + error.message);
  }
};

// Get all Parcelles with spatial data
const getAllParcelles = async () => {
  try {
    const parcelles = await Parcelle.findAll({
      include: [
        {
          model: User,
          as: 'owner', // ✅ Use the correct alias from the model
          attributes: ['id', 'userName', 'email'],
        },
      ],
    });
    return parcelles;
  } catch (error) {
    throw new Error('Error fetching parcelles: ' + error.message);
  }
};


// Get a single Parcelle by ID with spatial data
const getParcelleById = async (id) => {
  try {
    const parcelle = await Parcelle.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner', 
          attributes: ['id', 'userName', 'email'],
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

    if (data.userId) {
      const user = await User.findByPk(data.userId);
      if (!user) {
        throw new Error('User not found');
      }
    }

    let updatedData = { ...data };
    if (data.coordinates) {
      const polygonWKT = `POLYGON((${data.coordinates[0]
        .map(coord => `${coord[0]} ${coord[1]}`)
        .join(', ')}))`;

      updatedData.geom = sequelize.fn('ST_GeomFromText', polygonWKT);
    }

    await parcelle.update(updatedData);
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

// Helper function to parse WKT POLYGON to array format
const parsePolygon = (wktString) => {
  return wktString
    .replace('POLYGON((', '')
    .replace('))', '')
    .split(', ')
    .map(point => point.split(' ').map(Number));
};

module.exports = {
  createParcelle,
  getAllParcelles,
  getParcelleById,
  updateParcelle,
  deleteParcelle,
};
