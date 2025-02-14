// routes/legendeRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const legendeController = require('../../controllers/Precision/legendController');

// Create a new Legende
router.post('/',authMiddleware, legendeController.createLegende);

// Get all Legendes
router.get('/',authMiddleware, legendeController.getAllLegendes);

router.get('/legendes/:indiceId', legendeController.getLegendesByIndiceId);

// Get a single Legende by ID
router.get('/:id',authMiddleware, legendeController.getLegendeById);

// Update a Legende by ID
router.put('/:id',authMiddleware, legendeController.updateLegende);

// Delete a Legende by ID
router.delete('/:id',authMiddleware, legendeController.deleteLegende);

module.exports = router;
