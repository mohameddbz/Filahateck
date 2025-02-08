const express = require('express');
const { create, getAll, getById, update, suprimer } = require('../../controllers/Abonnement/FonctionnalitiesController');

const router = express.Router();

// CRUD Routes for Fonctionnalities
router.post('/', create); // Create a Fonctionnality
router.get('/', getAll); // Get all Fonctionnalities
router.get('/:id', getById); // Get a Fonctionnality by ID
router.put('/:id', update); // Update a Fonctionnality by ID
router.delete('/:id', suprimer); // Delete a Fonctionnality by ID

module.exports = router;
