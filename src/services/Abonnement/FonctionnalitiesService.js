const Fonctionnalities = require('../../models/Abonement/Fonctionnalities');

const createFonctionnality = async (data) => {
  return await Fonctionnalities.create(data);
};

const getAllFonctionnalities = async () => {
  return await Fonctionnalities.findAll();
};

const getFonctionnalityById = async (id) => {
  return await Fonctionnalities.findByPk(id);
};

const updateFonctionnality = async (id, data) => {
  return await Fonctionnalities.update(data, { where: { id } });
};

const deleteFonctionnality = async (id) => {
  return await Fonctionnalities.destroy({ where: { id } });
};

module.exports = {
  createFonctionnality,
  getAllFonctionnalities,
  getFonctionnalityById,
  updateFonctionnality,
  deleteFonctionnality,
};
