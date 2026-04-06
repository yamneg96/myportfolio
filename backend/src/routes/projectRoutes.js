const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes (CMS)
router.post('/', protect, upload.single('image'), createProject);
router.put('/:id', protect, upload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
