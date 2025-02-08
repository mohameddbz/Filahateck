// routes/abonnementIndiceRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const abonnementIndiceController = require('../../controllers/Precision/abonnementIndiceController');

// Create a new AbonnementIndice
router.post('/',authMiddleware, abonnementIndiceController.createAbonnementIndice);

// Get all AbonnementIndices
router.get('/',authMiddleware, abonnementIndiceController.getAllAbonnementIndices);

// Get a single AbonnementIndice by ID
router.get('/:id',authMiddleware, abonnementIndiceController.getAbonnementIndiceById);

// Delete an AbonnementIndice by ID
router.delete('/:id',authMiddleware, abonnementIndiceController.deleteAbonnementIndice);

module.exports = router;
