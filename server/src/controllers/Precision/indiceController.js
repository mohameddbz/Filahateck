// controllers/indiceController.js
const indiceService = require('../../services/Precision/indiceService');

// Create a new Indice
const createIndice = async (req, res) => {
  try {
    const indiceData = req.body;
    const indice = await indiceService.createIndice(indiceData);
    return res.status(201).json(indice);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all Indices
const getAllIndices = async (req, res) => {
  try {
    const indices = await indiceService.getAllIndices();
    return res.status(200).json(indices);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get a single Indice by ID
const getIndiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const indice = await indiceService.getIndiceById(id);
    return res.status(200).json(indice);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Update an Indice by ID
const updateIndice = async (req, res) => {
  try {
    const { id } = req.params;
    const indiceData = req.body;
    const indice = await indiceService.updateIndice(id, indiceData);
    return res.status(200).json(indice);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete an Indice by ID
const deleteIndice = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await indiceService.deleteIndice(id);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getUserIndices = async (req, res) => {
  const { userId } = req.params; // Get userId from request params

  // Check if userId exists
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Fetch indices data using the service
    const indices = await indiceService.fetchUserIndices(userId);

    // If no indices are found for the user
    if (!indices || indices.length === 0) {
      return res.status(404).json({ message: 'No indices found for the user' });
    }

    // Return the indices data as the response
    return res.status(200).json(indices);
  } catch (error) {
    console.error('Error fetching user indices:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Error fetching user indices' });
  }
};




module.exports = {
  createIndice,
  getAllIndices,
  getIndiceById,
  updateIndice,
  deleteIndice,
  getUserIndices
};
