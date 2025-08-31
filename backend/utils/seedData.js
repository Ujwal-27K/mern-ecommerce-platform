const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');

const products = [
  // Add sample products here as per your data model
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
