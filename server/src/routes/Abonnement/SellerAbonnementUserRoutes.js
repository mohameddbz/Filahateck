const express = require('express');
const router = express.Router();
const authMiddleware = require('./../../middlewares/authMiddleware');
const sellerAbonnementUserController = require('./../../controllers/Abonnement/SellerAbonnementUserController');

// Routes pour SellerAbonnementUser
router.post('/',authMiddleware, sellerAbonnementUserController.createSellerAbonnementUser);
router.get('/', sellerAbonnementUserController.getAllSellerAbonnementUsers);
router.get('/unique/:id', sellerAbonnementUserController.getSellerAbonnementUserById);
router.put('/:id', sellerAbonnementUserController.updateSellerAbonnementUser);
router.delete('/:id', sellerAbonnementUserController.deleteSellerAbonnementUser);
router.get('/current/', authMiddleware,sellerAbonnementUserController.getCurrentSellerAbonnementUser);

module.exports = router;