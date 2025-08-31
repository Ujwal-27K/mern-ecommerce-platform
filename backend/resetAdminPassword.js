require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      console.log('Admin user not found.');
      return process.exit(1);
    }

    const newHashedPassword = await bcrypt.hash('Admin1234', 10);

    adminUser.password = newHashedPassword;
    await adminUser.save();

    console.log('Admin user password updated successfully.');
    process.exit(0);

  } catch (error) {
    console.error('Error resetting admin password:', error);
    process.exit(1);
  }
}

resetPassword();
