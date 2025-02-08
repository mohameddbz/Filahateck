const Abonnement = require('../../models/Abonement/Abonnement');

const createAbonnement = async (data) => {
  return await Abonnement.create(data);
};

const getAllAbonnements = async () => {
  return await Abonnement.findAll();
};

const getAbonnementById = async (id) => {
  return await Abonnement.findByPk(id);
};

const updateAbonnement = async (id, data) => {
  return await Abonnement.update(data, { where: { id } });
};

const deleteAbonnement = async (id) => {
  return await Abonnement.destroy({ where: { id } });
};

module.exports = {
  createAbonnement,
  getAllAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement,
};
