const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User/User');
const Role = require('../models/Role/Role');
const { createUserSellerRole } = require('./../services/user/userSellerRoleService');
const { successResponse } = require('../utils/response');
const { errorResponse } = require('../utils/error');
const { sequelize } = require('../config/config'); // Import your Sequelize instance

// Register user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.log(errors);
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    return errorResponse(res, 400, errors, formattedErrors);
  }

  const { email, userName, password, phone_number, profile_picture, wilaya, role_id ,sellerRole_id } = req.body;

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
      password: password,
      phone_number,
      profile_picture,
      wilaya,
      role_id,
    });

    if(newUser && sellerRole_id){
      await createUserSellerRole(newUser.id,sellerRole_id);
    }

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

  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();

  if (!email || !password) {
    return errorResponse(res, 400, 'Email or password missing');
  }

  try {
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ['roleName'],
      },
    });

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    console.log("User found:", user.toJSON());

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return errorResponse(res, 401, 'Invalid password');
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email, role: user.Role.roleName },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    const userInfo = {
      userId: user.id,
      email: user.email,
      userName: user.userName,
      roleName: user.Role.roleName,
      phone_number: user.phone_number,
      wilaya: user.wilaya,
    };

    return successResponse(res, 200, 'Login successful', { token, user: userInfo });

  } catch (error) {
    console.error('Error during login:', error);
    return errorResponse(res, 500, 'Error logging in', error.message);
  }
};





module.exports = { registerUser, loginUser };
