const userService = require('../../services/user/userService');
const { validationResult } = require('express-validator');
const { successResponse } = require('../../utils/response');
const { errorResponse } = require('../../utils/error');

// Create User
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'Validation failed', errors.array());
  }

  try {
    const newUser = await userService.createUser(req.body);
    return successResponse(res, 201, 'User created successfully', newUser);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to create user', error.message);
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to fetch users', error.message);
  }
};

// Get User By ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }
    return successResponse(res, 200, 'User retrieved successfully', user);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to fetch user', error.message);
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return errorResponse(res, 404, 'User not found');
    }
    return successResponse(res, 200, 'User updated successfully', updatedUser);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to update user', error.message);
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const isDeleted = await userService.deleteUser(req.params.id);
    if (!isDeleted) {
      return errorResponse(res, 404, 'User not found');
    }
    return successResponse(res, 200, 'User deleted successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Failed to delete user', error.message);
  }
};

// Get User Info from Token
const getUserInfo = (req, res) => {
  try {
    const { user_id, role_id } = req.user;
    if (!user_id) {
      return res.status(400).json({ status: "error", message: "User information not found" });
    }

    return res.status(200).json({
      status: "success",
      data: {
        user_id,
        role_id,
      },
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// New endpoint: Get full user profile (including abonnement)
const getUserProfile = async (req, res) => {
  // If using authentication, you may extract the user id from req.user
  const userId = req.user?.user_id || req.params.id; 
  try {
    const profile = await userService.getUserProfile(userId);
    return successResponse(res, 200, 'User profile retrieved successfully', profile);
  } catch (error) {
    return errorResponse(res, 500, 'Failed to fetch user profile', error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserInfo,
  getUserProfile,
};
