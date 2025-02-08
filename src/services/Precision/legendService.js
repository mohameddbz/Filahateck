// services/legendService.js
const Legend = require('../../models/Precision/Legende');

// Create a new Legend
const createLegendd = async (data) => {
  try {
    const legend = await Legend.create(data);
    return legend;
  } catch (error) {
    throw new Error('Error creating legend: ' + error.message);
  }
};

// Get all Legends
const getAllLegend = async () => {
  try {
    const legends = await Legend.findAll();
    return legends;
  } catch (error) {
    throw new Error('Error fetching legends: ' + error.message);
  }
};

// Get a single Legend by ID
const getById = async (id) => {
  try {
    const legend = await Legend.findByPk(id);
    if (!legend) {
      throw new Error('Legend not found');
    }
    return legend;
  } catch (error) {
    throw new Error('Error fetching legend: ' + error.message);
  }
};

// Update a Legend by ID
const updateLeg = async (id, data) => {
  try {
    const legend = await Legend.findByPk(id);
    if (!legend) {
      throw new Error('Legend not found');
    }
    await legend.update(data);
    return legend;
  } catch (error) {
    throw new Error('Error updating legend: ' + error.message);
  }
};

// Delete a Legend by ID
const deleteLeg = async (id) => {
  try {
    const legend = await Legend.findByPk(id);
    if (!legend) {
      throw new Error('Legend not found');
    }
    await legend.destroy();
    return { message: 'Legend deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting legend: ' + error.message);
  }
};

module.exports = {
  createLegendd,
  getAllLegend,
  getById,
  updateLeg,
  deleteLeg
};
