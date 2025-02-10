const express = require('express');
const { createAbonnement, getAllAbonnements, getAbonnementById, updateAbonnement, deleteAbonnement ,getAbonnementDetails } = require('../../controllers/Abonnement/AbonnementController');

const router = express.Router();

// CRUD Routes for Abonnement
router.post('/', createAbonnement); // Create an Abonnement
router.get('/', getAllAbonnements); // Get all Abonnements
router.get('/details', getAbonnementDetails);
router.get('/:id', getAbonnementById); // Get an Abonnement by ID
router.put('/:id', updateAbonnement); // Update an Abonnement by ID
router.delete('/:id', deleteAbonnement); // Delete an Abonnement by ID


module.exports = router;
