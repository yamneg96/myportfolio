const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createSkillSchema, updateSkillSchema } = require('../utils/validationSchemas');

// Public routes
router.get('/', getSkills);
router.get('/:id', getSkill);

// Protected routes (CMS)
router.post('/', protect, validate(createSkillSchema), createSkill);
router.put('/:id', protect, validate(updateSkillSchema), updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
