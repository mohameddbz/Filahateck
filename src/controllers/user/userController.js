// The controller handles requests and responses and delegates business logic 
// to the service layer.

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

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };