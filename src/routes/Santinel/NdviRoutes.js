const express = require('express');
const router = express.Router();
const { createRequest } = require('./../../controllers/Santinel/NdviController'); // Make sure to import the correct function
const authMiddleware = require('../../middlewares/authMiddleware');
const { createNdwiRequest } = require('./../../controllers/Santinel/NdwiController');

router.post('/imageNdvi', authMiddleware, createRequest); // Use the correct function here
router.post('/imageNdwi', authMiddleware, createNdwiRequest);

module.exports = router;
