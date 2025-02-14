// controllers/legendeController.js
const legendeService = require('../../services/Precision/legendService');

// Create a new Legende
const createLegende = async (req, res) => {
  try {
    const legendeData = req.body;
    const legende = await legendeService.createLegendd(legendeData);
    return res.status(201).json(legende);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all Legendes
const getAllLegendes = async (req, res) => {
  try {
    const legendes = await legendeService.getAllLegend();
    return res.status(200).json(legendes);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get a single Legende by ID
const getLegendeById = async (req, res) => {
  try {
    const { id } = req.params;
    const legende = await legendeService.getById(id);
    return res.status(200).json(legende);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Update a Legende by ID
const updateLegende = async (req, res) => {
  try {
    const { id } = req.params;
    const legendeData = req.body;
    const legende = await legendeService.updateLeg(id, legendeData);
    return res.status(200).json(legende);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a Legende by ID
const deleteLegende = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await legendeService.deleteLeg(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getLegendesByIndiceId = async (req, res) => {
  try {
    const { indiceId } = req.params;
    console.log("===",indiceId)

    const legendes = await legendeService.getLegendesByIndiceId(indiceId);

    res.status(200).json(legendes);
  } catch (error) {
    console.error("Erreur dans le contrôleur Legende:", error.message);
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createLegende,
  getAllLegendes,
  getLegendeById,
  updateLegende,
  deleteLegende,
  getLegendesByIndiceId
};
