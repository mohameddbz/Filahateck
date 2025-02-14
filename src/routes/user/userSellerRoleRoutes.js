const express = require('express');
const userSellerRoleController = require('../../controllers/user/userSellerRoleController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware,userSellerRoleController.getSellerRoleOfUserByID);


module.exports = router;
