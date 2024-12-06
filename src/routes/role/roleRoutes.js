const express = require('express');
const { createRole, updateRole, deleteRole, getRoles } = require('../../controllers/role/roleController');
const authMiddleware = require('../../middlewares/authMiddleware');
const isAdmin = require('../../middlewares/isAdmin');

const router = express.Router();

// Admin-only routes: Apply both authMiddleware and isAdmin
router.post('/', authMiddleware, isAdmin, createRole);  // Create role
router.put('/:id', authMiddleware, isAdmin, updateRole);  // Update role
router.delete('/:id', authMiddleware, isAdmin, deleteRole);  // Delete role

// Public route to get all roles (no admin check required)
router.get('/', getRoles);  // View all roles

module.exports = router;
