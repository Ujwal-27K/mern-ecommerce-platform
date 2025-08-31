const Order = require('../models/Order');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/email');

const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });

    const { items, shippingAddress, billingAddress, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      if (product.stock < item.quantity) return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
    }

    const order = await Order.create({
      user: req.user._id,
      items: items.map(item => ({ product: item.product, name: item.name, price: item.price, quantity: item.quantity, image: item.image })),
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    await order.populate('user', 'name email');
    await order.populate('items.product', 'name images');

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

module.exports = {
  createOrder
};
