const Order = require('../models/Order');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/email');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      if (product.stock < item.qty) return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems: orderItems.map(item => ({ product: item.product, name: item.name, price: item.price, qty: item.qty, image: item.image })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
    }

    await order.populate('user', 'name email');
    await order.populate('orderItems.product', 'name images');

    try {
      await sendEmail({
        to: req.user.email,
        subject: 'Order Confirmation',
        template: 'orderConfirmation',
        data: { user: req.user.name, order, orderUrl: `${process.env.CLIENT_URL}/orders/${order._id}` }
      });
    } catch (emailError) {
      console.error('Order confirmation email error:', emailError);
    }

    res.status(201).json({ success: true, message: 'Order created successfully', data: { order } });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error creating order' });
  }
};


// Get all orders (admin only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('orderItems.product', 'name images');
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('orderItems.product', 'name images');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    // Only allow owner or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching order' });
  }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product', 'name images');
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching your orders' });
  }
};

// Update order to paid
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = req.body.paymentResult || {};
    await order.save();
    res.json({ success: true, message: 'Order marked as paid', data: order });
  } catch (error) {
    console.error('Update order to paid error:', error);
    res.status(500).json({ success: false, message: 'Server error updating order to paid' });
  }
};

// Update order to delivered (admin only)
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.json({ success: true, message: 'Order marked as delivered', data: order });
  } catch (error) {
    console.error('Update order to delivered error:', error);
    res.status(500).json({ success: false, message: 'Server error updating order to delivered' });
  }
};

// Delete order (admin only)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    await order.remove();
    res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting order' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder
};
