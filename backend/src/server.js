const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const seedAdmin = require('./utils/seedAdmin');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Seed admin user (Runs after DB connection initiated in app.js)
    // Note: seedAdmin usually checks if the connection is ready internally
    await seedAdmin();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}/api`);
      console.log(`❤️  Health: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();