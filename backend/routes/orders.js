const express = require('express');
const { body } = require('express-validator');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
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


// Get all orders (admin only)
router.get('/', protect, admin, getOrders);

// Get logged-in user's orders
router.get('/myorders', protect, getMyOrders);

// Get order by ID
router.get('/:id', protect, getOrderById);

// Create new order
router.post('/', protect, orderValidation, createOrder);

// Update order to paid
router.put('/:id/pay', protect, updateOrderToPaid);

// Update order to delivered (admin only)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

// Delete order (admin only)
router.delete('/:id', protect, admin, deleteOrder);

// Add other order routes similarly

module.exports = router;
