const express = require('express');
const SellerAbonnementFonctionnalitiesController = require('../../controllers/Abonnement/SellerAbonnementFonctionnalitiesController');
const router = express.Router();

// Routes pour SellerAbonnementFonctionnalities

// Créer une nouvelle entrée
router.post('/', SellerAbonnementFonctionnalitiesController.create);

// Récupérer toutes les entrées
router.get('/', SellerAbonnementFonctionnalitiesController.getAll);

// Supprimer une entrée
router.delete('/', SellerAbonnementFonctionnalitiesController.delete);

// Récupérer toutes les entrées détaillées
router.get('/detailed', SellerAbonnementFonctionnalitiesController.getAllDetailed);

module.exports = router;