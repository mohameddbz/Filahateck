const express = require('express');
const { validateUser } = require('../validations/User/registration');
const { registerUser , loginUser} = require('./authController');

const router = express.Router();

// Register user
router.post('/register', validateUser, registerUser);

// Login user
router.post('/login', loginUser);

module.exports = router;
