const express = require('express');
const { protect, admin } = require('../middleware/auth');
const {
  getReviews,
  createReview,
  approveReview,
  deleteReview
} = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getReviews);
router.post('/', protect, createReview);
router.put('/:id/approve', protect, admin, approveReview);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;
