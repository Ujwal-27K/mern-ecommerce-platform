const express = require('express');
const { body } = require('express-validator');
const { createOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

const orderValidation = [
  body('orderItems').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('orderItems.*.product').isMongoId().withMessage('Invalid product ID'),
  body('orderItems.*.qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress.address').notEmpty(),
  body('shippingAddress.city').notEmpty(),
  body('shippingAddress.postalCode').notEmpty(),
  body('shippingAddress.country').notEmpty(),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number')
];

router.post('/', protect, orderValidation, createOrder);

// Add other order routes similarly

module.exports = router;
