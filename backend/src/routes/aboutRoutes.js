const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public route
router.get('/', getAbout);

// Protected route (CMS) — with optional avatar upload
router.put('/', protect, upload.single('avatar'), updateAbout);

module.exports = router;
