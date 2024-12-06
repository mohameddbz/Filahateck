const { body } = require('express-validator');

const strongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Validation for user registration
const validateUser = [
    body('userName')
      .trim()
      .notEmpty()
      .withMessage(({ path }) => `${path} is required`)
      .isLength({ min: 3, max: 50 })
      .withMessage(({ path }) => `${path} must be between 3 and 50 characters`),
      
    body('email')
      .trim()
      .isEmail()
      .withMessage(({ path }) => `${path} is invalid`),
      
      body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage(({ path }) => `${path} must be at least 8 characters`)
      .custom((value) => {
        if (!strongPassword(value)) {
          throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        }
        return true;
      }),
      
      body('phone_number')
      .optional()
      .matches(/^\d{10}$/)
      .withMessage('Phone number must be exactly 10 digits')
      .isLength({ max: 10 , min:10 })
      .withMessage('Phone number with 10 digits'),
      
    body('profile_picture')
      .optional()
      .isURL()
      .withMessage(({ path }) => `${path} must be a valid URL`),
      
    body('wilaya')
      .optional()
      .isInt({ min: 1, max: 58 }) // Example: Algerian Wilaya (1-58)
      .withMessage(({ path }) => `${path} must be a valid Wilaya code`),
      
    body('role_id')
      .isInt({ min: 1 })
      .withMessage(({ path }) => `${path} is required and must be a valid role ID`),
  ];
  

module.exports = { validateUser };
