const  Role  = require('../models/Role/Role');  

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const { role_id } = req.user;
    const role = await Role.findByPk(role_id);
    if (role && role.roleName === 'Admin') {
      return next(); // Proceed to the next middleware or route handler
    }
    return res.status(403).json({
      status: 'error',
      message: 'Access denied: You do not have admin privileges',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while checking user role',
    });
  }
};

module.exports = isAdmin;
