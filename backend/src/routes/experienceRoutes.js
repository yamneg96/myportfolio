const express = require('express');
const router = express.Router();
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createExperienceSchema, updateExperienceSchema } = require('../utils/validationSchemas');

// Public routes
router.get('/', getExperiences);
router.get('/:id', getExperience);

// Protected routes (CMS)
router.post('/', protect, validate(createExperienceSchema), createExperience);
router.put('/:id', protect, validate(updateExperienceSchema), updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
