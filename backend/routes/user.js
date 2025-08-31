const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/user/profile - protected user profile route
router.get('/profile', authMiddleware, (req, res) => {
  // req.user contains user info from the token
  res.json({ success: true, data: { userId: req.user.id, role: req.user.role } });
});

module.exports = router;
