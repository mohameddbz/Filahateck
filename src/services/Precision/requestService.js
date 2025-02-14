// services/requestService.js
const Request = require('../../models/Precision/Request');
const path = require('path');
const fs = require('fs');
const { sequelize } = require('../../config/config');

// Create a new Request
const createRequest = async (data) => {
  try {
    const request = await Request.create(data);
    return request;
  } catch (error) {
    throw new Error('Error creating request: ' + error.message);
  }
};

// Get all Requests
const getAllRequests = async () => {
  try {
    const requests = await Request.findAll();
    return requests;
  } catch (error) {
    throw new Error('Error fetching requests: ' + error.message);
  }
};

// Get a single Request by ID
const getRequestById = async (id) => {
  try {
    const request = await Request.findByPk(id);
    if (!request) {
      throw new Error('Request not found');
    }
    return request;
  } catch (error) {
    throw new Error('Error fetching request: ' + error.message);
  }
};

// Update a Request by ID
const updateRequest = async (id, data) => {
  try {
    const request = await Request.findByPk(id);
    if (!request) {
      throw new Error('Request not found');
    }
    await request.update(data);
    return request;
  } catch (error) {
    throw new Error('Error updating request: ' + error.message);
  }
};

// Delete a Request by ID
const deleteRequest = async (id) => {
  try {
    const request = await Request.findByPk(id);
    if (!request) {
      throw new Error('Request not found');
    }
    await request.destroy();
    return { message: 'Request deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting request: ' + error.message);
  }
};


const getImageData = async (userId, parcelleId, indiceId) => {
  try {
    // SQL query to fetch the request data
    const query = `
      SELECT
        r.id AS requestId,
        DATE_FORMAT(r.dateDebut, '%d/%m/%y') AS dateDebut,
        DATE_FORMAT(r.dateFin, '%d/%m/%y') AS dateFin,
        r.created_at,
        r.updated_at,
        r.imageUrl,
        r.user_id,
        r.indice_id,
        r.parcelle_id
      FROM requests r
      WHERE r.indice_id = :indiceId
        AND r.user_id = :userId
        AND r.parcelle_id = :parcelleId;
    `;

    // Execute the query with replacements for parameters
    const result = await sequelize.query(query, {
      replacements: { userId, parcelleId, indiceId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (result && result.length > 0) {
      const { imageUrl, dateDebut, dateFin } = result[0];
      const imagePath = path.resolve(__dirname, '../../uploads', imageUrl.split('/').pop());

      // Check if the image exists
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

        return { imageUrl: base64Image, dateDebut, dateFin }; 
      } else {
        throw new Error('Image not found');
      }
    } else {
      throw new Error('No data found for the given parameters');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

const getAllImageData = async (userId, parcelleId, indiceId) => {
  try {
    // SQL query to fetch all matching requests
    const query = `
      SELECT
        r.id AS requestId,
        DATE_FORMAT(r.dateDebut, '%d/%m/%y') AS dateDebut,
        DATE_FORMAT(r.dateFin, '%d/%m/%y') AS dateFin,
        r.created_at,
        r.updated_at,
        r.imageUrl,
        r.user_id,
        r.indice_id,
        r.parcelle_id
      FROM requests r
      WHERE r.indice_id = :indiceId
        AND r.user_id = :userId
        AND r.parcelle_id = :parcelleId;
    `;

    // Execute the query with replacements for parameters
    const results = await sequelize.query(query, {
      replacements: { userId, parcelleId, indiceId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length > 0) {
      // Process all images
      const images = results.map(({ imageUrl, dateDebut, dateFin }) => {
        const imagePath = path.resolve(__dirname, '../../uploads', imageUrl.split('/').pop());

        if (fs.existsSync(imagePath)) {
          const imageBuffer = fs.readFileSync(imagePath);
          const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

          return { imageUrl: base64Image, dateDebut, dateFin };
        } else {
          return { imageUrl: null, dateDebut, dateFin, error: 'Image not found' };
        }
      });

      return images;
    } else {
      throw new Error('No data found for the given parameters');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};





module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getImageData,
  getAllImageData
};
