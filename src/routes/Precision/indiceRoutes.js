// routes/indiceRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const indiceController = require('../../controllers/Precision/indiceController');

// POST - Create a new indice
router.post('/',authMiddleware, indiceController.createIndice);

// GET - Get all indices
router.get('/',authMiddleware, indiceController.getAllIndices);

router.get('/:userId/indices',authMiddleware, indiceController.getUserIndices);

// GET - Get a single indice by ID
router.get('/:id',authMiddleware, indiceController.getIndiceById);

// PUT - Update an indice by ID
router.put('/:id',authMiddleware, indiceController.updateIndice);

// DELETE - Delete an indice by ID
router.delete('/:id',authMiddleware, indiceController.deleteIndice);

module.exports = router;
