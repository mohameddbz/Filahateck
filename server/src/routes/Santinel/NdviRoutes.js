const express = require('express');
const router = express.Router();
const { createRequest } = require('./../../controllers/Santinel/NdviController'); // Make sure to import the correct function
const authMiddleware = require('../../middlewares/authMiddleware');
const { createNdwiRequest } = require('./../../controllers/Santinel/NdwiController');
const { createNdreRequest } = require('./../../controllers/Santinel/NdreController');
const { createNdmiRequest } = require('./../../controllers/Santinel/NdmiController');
const { createMsaviRequest } = require('./../../controllers/Santinel/MsaviController');

router.post('/imageNdvi', authMiddleware, createRequest); // Use the correct function here
router.post('/imageNdwi', authMiddleware, createNdwiRequest);
router.post('/imageNdre', authMiddleware, createNdreRequest);
router.post('/imageNdmi', authMiddleware, createNdmiRequest);
router.post('/imageMsavi', authMiddleware, createMsaviRequest);

module.exports = router;
