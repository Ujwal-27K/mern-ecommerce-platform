const Review = require('../models/Review');
const { validationResult } = require('express-validator');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'name avatar').populate('product', 'name');
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};

const createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });

    const { product, rating, title, comment } = req.body;
    const user = req.user._id;

    const existingReview = await Review.findOne({ user, product });
    if (existingReview) return res.status(400).json({ success: false, message: 'You have already reviewed this product' });

    const review = new Review({
      user,
      product,
      rating,
      title,
      comment,
      status: 'pending'
    });
    await review.save();

    res.status(201).json({ success: true, message: 'Review submitted for approval', data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating review' });
  }
};

const approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    review.status = 'approved';
    await review.save();
    res.json({ success: true, message: 'Review approved', data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error approving review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    await review.remove();
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting review' });
  }
};

module.exports = {
  getReviews,
  createReview,
  approveReview,
  deleteReview
};
