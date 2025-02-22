const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const parcelleController = require('../../controllers/Precision/parcelleController');

// POST - Create a new parcelle
router.post('/', authMiddleware, parcelleController.createParcelle);

// GET - Get all parcelles
router.get('/', authMiddleware, parcelleController.getAllParcelles);

// GET - Get a parcelle by ID
router.get('/:id', authMiddleware, parcelleController.getParcelleById);

// GET - Get parcelles by user ID
router.get('/user/:userId', authMiddleware, parcelleController.getParcellesByUserId);

// PUT - Update a parcelle by ID
router.put('/:id', authMiddleware, parcelleController.updateParcelle);

// DELETE - Delete a parcelle by ID
router.delete('/:id', authMiddleware, parcelleController.deleteParcelle);

module.exports = router;
