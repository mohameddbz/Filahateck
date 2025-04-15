const { body } = require('express-validator');

// Validation for user login
const validateLogin = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 8 }).withMessage('Password is required'),
];

module.exports = { validateLogin };
