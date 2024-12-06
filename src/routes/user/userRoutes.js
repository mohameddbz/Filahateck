const express = require('express');
const userController = require('../../controllers/user/userController');
const { validateUser } = require('../../validations/User/registration');
const authMiddleware = require('../../middlewares/authMiddleware');
const isAdmin = require('../../middlewares/isAdmin');

const router = express.Router();

router.post('/',authMiddleware, isAdmin, validateUser, userController.createUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware,userController.getUserById);
router.put('/:id', authMiddleware, isAdmin,validateUser, userController.updateUser);
router.delete('/:id',authMiddleware,  isAdmin, userController.deleteUser);

module.exports = router;
