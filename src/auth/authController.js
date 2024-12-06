const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User/User');
const { successResponse } = require('../utils/response');
const { errorResponse } = require('../utils/error');

// Register user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    return errorResponse(res, 400, 'Paasword Week', formattedErrors);
  }

  const { email, userName, password, phone_number, profile_picture, wilaya, role_id } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, 400, 'Email is already in use', [
        { field: 'email', message: 'This email is already registered' },
      ]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      userName,
      password: hashedPassword,
      phone_number,
      profile_picture,
      wilaya,
      role_id,
    });

    return successResponse(res, 201, 'User created successfully', {
      id: newUser.id,
      email: newUser.email,
      userName: newUser.userName,
      role_id: newUser.role_id,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, 'Server error');
  }
};

// Login user
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 400, 'Validation failed', errors.array());
    }
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid password');
        }

        const token = jwt.sign(
            { userId: user.email, role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const userInfo = {
            userId: user.email,
            userName: user.userName,
            role: user.role_id,
            phone_number: user.phone_number,
            wilaya: user.wilaya,
        };

        return successResponse(res, 200, 'Login successful', { token, user: userInfo });
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, 'Error logging in', error.message);
    }
};

module.exports = { registerUser, loginUser };
