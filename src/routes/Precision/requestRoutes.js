// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const requestController = require('../../controllers/Precision/requestController');

// Create a new Request
router.post('/', requestController.createRequest);

// Get all Requests
router.get('/', requestController.getAllRequests);

router.get('/image', requestController.getImage);

router.get('/images', requestController.getAllImages);

// Get a single Request by ID
router.get('/:id', requestController.getRequestById);

// Update a Request by ID
router.put('/:id', requestController.updateRequest);

// Delete a Request by ID
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
