const express = require('express');
const { createSellerRole, updateSellerRole, deleteSellerRole, getSellerRoles } = require('../../controllers/role/sellerRoleController');
const authMiddleware = require('../../middlewares/authMiddleware');
const isAdmin = require('../../middlewares/isAdmin');

const router = express.Router();

// Admin-only routes: Apply both authMiddleware and isAdmin
router.post('/', authMiddleware, isAdmin, createSellerRole);  // Create role
router.put('/:id', authMiddleware, isAdmin, updateSellerRole);  // Update role
router.delete('/:id', authMiddleware, isAdmin, deleteSellerRole);  // Delete role

// Public route to get all roles (no admin check required)
router.get('/', getSellerRoles);  // View all roles

module.exports = router;
