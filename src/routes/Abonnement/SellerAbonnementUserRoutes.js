const express = require('express');
const router = express.Router();
const sellerAbonnementUserController = require('./../../controllers/Abonnement/SellerAbonnementUserController');

// Routes pour SellerAbonnementUser
router.post('/', sellerAbonnementUserController.createSellerAbonnementUser);
router.get('/', sellerAbonnementUserController.getAllSellerAbonnementUsers);
router.get('/:id', sellerAbonnementUserController.getSellerAbonnementUserById);
router.put('/:id', sellerAbonnementUserController.updateSellerAbonnementUser);
router.delete('/:id', sellerAbonnementUserController.deleteSellerAbonnementUser);

module.exports = router;