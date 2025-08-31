const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// GET /api/products
const getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', category, search } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = { status: 'active' };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

// GET /api/products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching product' });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.files) {
        req.files.forEach(file => fs.unlinkSync(file.path));
      }
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { name, description, price, category, brand, sku, stock } = req.body;

    const images = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
        images.push({ public_id: result.public_id, url: result.secure_url, alt: name });
        fs.unlinkSync(file.path);
      }
    }

    const product = new Product({ name, description, price, category, brand, sku, stock, images, vendor: req.user._id });

    await product.save();

    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Server error creating product' });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const { name, description, price, category, brand, sku, stock } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (sku) product.sku = sku;
    if (stock !== undefined) product.stock = stock;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
        product.images.push({ public_id: result.public_id, url: result.secure_url, alt: product.name });
        fs.unlinkSync(file.path);
      }
    }

    await product.save();

    res.json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Server error updating product' });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.remove();

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting product' });
  }
};

const removeProductImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const image = product.images.id(imageId);
    if (!image) return res.status(404).json({ success: false, message: 'Image not found' });

    await cloudinary.uploader.destroy(image.public_id);

    image.remove();

    await product.save();

    res.json({ success: true, message: 'Image removed successfully', data: product.images });
  } catch (error) {
    console.error('Remove product image error:', error);
    res.status(500).json({ success: false, message: 'Server error removing image' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  removeProductImage
};
