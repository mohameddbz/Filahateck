const express = require('express');
const AbonnementUserController = require('../../controllers/Abonnement/AbonnementUserController');

const router = express.Router();

// Routes for AbonnementUser CRUD operations
router.post('/', AbonnementUserController.createAbonnementUser); // Create a new abonnementUser
router.get('/', AbonnementUserController.getAllAbonnementUsers); // Get all abonnementUsers
router.get('/:id', AbonnementUserController.getAbonnementUserById); // Get abonnementUser by ID
router.get('/user/:userId/status', AbonnementUserController.getAbonnementStatusByUserId);
router.put('/:id', AbonnementUserController.updateAbonnementUser); // Update abonnementUser by ID
router.delete('/:id', AbonnementUserController.deleteAbonnementUser); // Delete abonnementUser by ID

module.exports = router;
