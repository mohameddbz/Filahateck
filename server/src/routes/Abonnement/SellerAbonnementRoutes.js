const express = require('express');
const {
  createAbonnement,
  getAllAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement,
} = require('../../controllers/Abonnement/SellerAbonnementController'); // Importez les contrôleurs

const router = express.Router();

// Routes CRUD pour SellerAbonnement
router.post('/', createAbonnement); // Créer un nouvel abonnement
router.get('/', getAllAbonnements); // Récupérer tous les abonnements
router.get('/:id', getAbonnementById); // Récupérer un abonnement par son ID
router.put('/:id', updateAbonnement); // Mettre à jour un abonnement par son ID
router.delete('/:id', deleteAbonnement); // Supprimer un abonnement par son ID

module.exports = router;