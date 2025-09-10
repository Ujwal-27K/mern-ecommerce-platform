require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'The latest iPhone with Pro camera system, powerful A17 Pro chip, and titanium design.',
    price: 999.99,
    comparePrice: 1199.99,
    category: 'Electronics',
    subcategory: 'Smartphones',
    brand: 'Apple',
    sku: 'IPH15PRO001',
    stock: 50,
    images: [{
      public_id: 'sample_iphone',
      url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      alt: 'iPhone 15 Pro'
    }],
    specifications: [
      { name: 'Display', value: '6.1-inch Super Retina XDR' },
      { name: 'Chip', value: 'A17 Pro' },
      { name: 'Storage', value: '128GB' }
    ],
    featured: true,
    status: 'active'
  },
  {
    name: 'Nike Air Max 90',
    description: 'Classic running shoes with Max Air cushioning and iconic design.',
    price: 129.99,
    comparePrice: 149.99,
    category: 'Clothing',
    subcategory: 'Shoes',
    brand: 'Nike',
    sku: 'NIKE-AM90-001',
    stock: 75,
    images: [{
      public_id: 'sample_nike',
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      alt: 'Nike Air Max 90'
    }],
    specifications: [
      { name: 'Material', value: 'Leather and synthetic' },
      { name: 'Sole', value: 'Rubber' },
      { name: 'Cushioning', value: 'Max Air unit' }
    ],
    featured: true,
    status: 'active'
  },
  {
    name: 'Ceramic Plant Pot',
    description: 'Beautiful handcrafted ceramic pot perfect for indoor plants.',
    price: 24.99,
    category: 'Home & Garden',
    subcategory: 'Decor',
    brand: 'HomeDecor Co',
    sku: 'HDC-POT-001',
    stock: 30,
    images: [{
      public_id: 'sample_pot',
      url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
      alt: 'Ceramic Plant Pot'
    }],
    specifications: [
      { name: 'Material', value: 'Ceramic' },
      { name: 'Size', value: '6 inches diameter' },
      { name: 'Drainage', value: 'Yes' }
    ],
    featured: false,
    status: 'active'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      isEmailVerified: true
    });

    // Add sample products with admin id as vendor
    for (let product of products) {
      product.vendor = adminUser._id;
    }
    await Product.insertMany(products);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
