const Parcelle = require('../../models/Precision/Parcelle');
const User = require('../../models/User/User');
const { sequelize } = require('../../config/config');

// Create a new Parcelle
const createParcelle = async (data) => {
  try {
    if (!data.geom || !Array.isArray(data.geom.coordinates) || !data.geom.coordinates[0]) {
      throw new Error("Invalid geom: Must contain a 'coordinates' array.");
    }

    const coordinates = data.geom.coordinates[0];

    if (coordinates.length < 4) {
      throw new Error("Invalid coordinates: A polygon must have at least 4 points.");
    }

    // Convert coordinates array to a WKT POLYGON string
    const polygonWKT = `POLYGON((${coordinates
      .map(coord => `${coord[0]} ${coord[1]}`)
      .join(', ')}))`;

    console.log("Polygon WKT:", polygonWKT); // 🔍 Debugging

    const parcelle = await Parcelle.create({
      identifiantU: data.identifiantU || "Parcelle_Sans_Nom", // Default if missing
      bEN: Math.max(...coordinates.map(coord => coord[1])), // Max latitude (N)
      bES: Math.min(...coordinates.map(coord => coord[1])), // Min latitude (S)
      bWN: Math.max(...coordinates.map(coord => coord[0])), // Max longitude (E)
      bWS: Math.min(...coordinates.map(coord => coord[0])), // Min longitude (W)
      userId: data.userId,
      geom: sequelize.fn('ST_GeomFromText', polygonWKT), // Convert to POLYGON format
    });

    return parcelle;
  } catch (error) {
    console.error("Erreur lors de la création de la parcelle:", error.message);
    throw new Error("Error creating parcelle: " + error.message);
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

// Get Parcelles by User ID
const getParcellesByUserId = async (userId) => {
  try {
    const parcelles = await Parcelle.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'owner', 
          attributes: ['id', 'userName', 'email'],
        },
      ],
    });

    if (!parcelles.length) {
      throw new Error('No parcelles found for this user');
    }

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
  getParcellesByUserId,
  getParcelleById,
  updateParcelle,
  deleteParcelle,
};
