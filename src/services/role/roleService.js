const  Role  = require('../../models/Role/Role');

// Create a new role
const createRole = async (roleName) => {
  try {
    const role = await Role.create({ roleName });
    return role;
  } catch (error) {
    throw new Error('Error creating role');
  }
};

// Update a role by its ID
const updateRole = async (id, roleName) => {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Role not found');
      }
      role.roleName = roleName;
      await role.save();
      return role;
    } catch (error) {
      throw new Error(error.message || 'Error updating role');
    }
  };

  // Delete a role by its ID
const deleteRole = async (id) => {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Role not found');
      }
      await role.destroy();
      return role;
    } catch (error) {
      throw new Error(error.message || 'Error deleting role');
    }
  };

  // Get all roles
const getRoles = async () => {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error) {
      throw new Error('Error fetching roles');
    }
  };

  module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getRoles,
  };