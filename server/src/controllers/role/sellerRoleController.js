const { successResponse } = require('../../utils/response');
const { errorResponse } = require('../../utils/error');
const SellerRoleService = require('../../services/role/SellerRoleService');



// Create role
const createSellerRole = async (req, res) => {
  const { roleName } = req.body;
  try {
    const role = await SellerRoleService.createSellerRole(roleName);
    return successResponse(res, 201, 'Role created successfully', role);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error creating role');
  }
};

// Update role
const updateSellerRole = async (req, res) => {
  const { id } = req.params;
  const { roleName } = req.body;
  try {
    const role = await SellerRoleService.updateSellerRole(id, roleName);
    return successResponse(res, 200, 'Role updated successfully', role);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error updating role');
  }
};

// Delete role
const deleteSellerRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await SellerRoleService.deleteSellerRole(id);
    return successResponse(res, 200, 'Role deleted successfully', role);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error deleting role');
  }
};

// Get all roles
const getSellerRoles = async (req, res) => {
  try {
    const roles = await SellerRoleService.getSellerRoles();
    return successResponse(res, 200, 'Roles fetched successfully', roles);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error fetching roles');
  }
};

module.exports = {
    createSellerRole,
  updateSellerRole,
  deleteSellerRole,
  getSellerRoles,
};
