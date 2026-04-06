const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { loginSchema } = require('../utils/validationSchemas');

// POST /api/auth/login
router.post('/login', validate(loginSchema), login);

// GET /api/auth/me  (protected)
router.get('/me', protect, getMe);

module.exports = router;
