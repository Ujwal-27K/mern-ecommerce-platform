const express = require('express');
const { body } = require('express-validator');
const { createOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

const orderValidation = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.product').isMongoId().withMessage('Invalid product ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress.street').notEmpty(),
  body('shippingAddress.city').notEmpty(),
  body('shippingAddress.state').notEmpty(),
  body('shippingAddress.zipCode').notEmpty(),
  body('shippingAddress.country').notEmpty(),
  body('paymentInfo.method').isIn(['stripe', 'paypal', 'cod']).withMessage('Invalid payment method'),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number')
];

router.post('/', protect, orderValidation, createOrder);

// Add other order routes similarly

module.exports = router;
