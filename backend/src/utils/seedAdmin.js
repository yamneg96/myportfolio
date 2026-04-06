const User = require('../models/User');

/**
 * Seed the default admin user if no admin exists.
 * Uses credentials from .env (ADMIN_EMAIL, ADMIN_PASSWORD).
 */
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log(`👤 Admin user already exists: ${adminExists.email}`);
      return;
    }

    const admin = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@2026!',
      role: 'admin',
    });

    console.log(`✅ Admin user seeded: ${admin.email}`);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
};

module.exports = seedAdmin;
