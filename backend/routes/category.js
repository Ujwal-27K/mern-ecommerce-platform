const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoryController');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories);

module.exports = router;
