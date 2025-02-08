// controllers/requestController.js
const requestService = require('../../services/Precision/requestService');
const fs = require('fs');
const path = require('path');

// Create a new Request
const createRequest = async (req, res) => {
  try {
    const requestData = req.body;
    const request = await requestService.createRequest(requestData);
    return res.status(201).json(request);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all Requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get a single Request by ID
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await requestService.getRequestById(id);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Update a Request by ID
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const requestData = req.body;
    const request = await requestService.updateRequest(id, requestData);
    return res.status(200).json(request);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a Request by ID
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await requestService.deleteRequest(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


const getImage = async (req, res) => {
  const { userId, parcelleId, indiceId } = req.query;

  try {
    // Validate input parameters
    if (!userId || !parcelleId || !indiceId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Fetch image data from the service
    const imageData = await requestService.getImageData(userId, parcelleId, indiceId);

    // Return image data as a response
    return res.status(200).json(imageData);

  } catch (error) {
    console.error('Error in getImage controller:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


module.exports = { getAllRequests };


module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getImage
};
