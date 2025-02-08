const express = require('express');
const AbonnementFonctionnalitiesController = require('../../controllers/Abonnement/AbonnementFonctionnalitiesController');
const router = express.Router();

router.post('/', AbonnementFonctionnalitiesController.create);
router.get('/', AbonnementFonctionnalitiesController.getAll);
router.delete('/', AbonnementFonctionnalitiesController.delete);
router.get('/detailed', AbonnementFonctionnalitiesController.getAllDetailed);


module.exports = router;
