const  SellerRole = require('../../models/Role/SellerRole');

// Create a new role
const createSellerRole = async (roleName) => {
  try {
    const role = await SellerRole.create({ roleName });
    return role;
  } catch (error) {
    throw new Error('Error creating role');
  }
};

// Update a role by its ID
const updateSellerRole = async (id, roleName) => {
    try {
      const role = await SellerRole.findByPk(id);
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
const deleteSellerRole = async (id) => {
    try {
      const role = await SellerRole.findByPk(id);
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
const getSellerRoles = async () => {
    try {
      const roles = await SellerRole.findAll();
      return roles;
    } catch (error) {
      throw new Error('Error fetching roles');
    }
  };

  module.exports = {
    createSellerRole,
    updateSellerRole,
    deleteSellerRole,
    getSellerRoles,
  };