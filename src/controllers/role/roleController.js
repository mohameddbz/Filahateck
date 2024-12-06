const { successResponse } = require('../../utils/response');
const { errorResponse } = require('../../utils/error');
const roleService = require('../../services/role/roleService');

// Create role
const createRole = async (req, res) => {
  const { roleName } = req.body;
  try {
    const role = await roleService.createRole(roleName);
    return successResponse(res, 201, 'Role created successfully', role);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error creating role');
  }
};

// Update role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { roleName } = req.body;
  try {
    const role = await roleService.updateRole(id, roleName);
    return successResponse(res, 200, 'Role updated successfully', role);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error updating role');
  }
};

// Delete role
const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleService.deleteRole(id);
    return successResponse(res, 200, 'Role deleted successfully', role);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error deleting role');
  }
};

// Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await roleService.getRoles();
    return successResponse(res, 200, 'Roles fetched successfully', roles);
  } catch (error) {
    return errorResponse(res, 500, error.message || 'Error fetching roles');
  }
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  getRoles,
};
