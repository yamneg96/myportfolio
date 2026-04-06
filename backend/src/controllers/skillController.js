const Skill = require('../models/Skill');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get all skills (grouped by category)
 * @route   GET /api/skills
 * @access  Public
 */
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1, category: 1 });

  res.status(200).json({
    success: true,
    data: skills,
  });
});

/**
 * @desc    Get single skill category
 * @route   GET /api/skills/:id
 * @access  Public
 */
const getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    throw new ApiError('Skill category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: skill,
  });
});

/**
 * @desc    Create skill category
 * @route   POST /api/skills
 * @access  Private
 */
const createSkill = asyncHandler(async (req, res) => {
  // Check if category already exists
  const existing = await Skill.findOne({ category: req.body.category });
  if (existing) {
    throw new ApiError(`Skill category '${req.body.category}' already exists. Use PUT to update.`, 400);
  }

  const skill = await Skill.create(req.body);

  res.status(201).json({
    success: true,
    data: skill,
  });
});

/**
 * @desc    Update skill category
 * @route   PUT /api/skills/:id
 * @access  Private
 */
const updateSkill = asyncHandler(async (req, res) => {
  let skill = await Skill.findById(req.params.id);
  if (!skill) {
    throw new ApiError('Skill category not found', 404);
  }

  skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: skill,
  });
});

/**
 * @desc    Delete skill category
 * @route   DELETE /api/skills/:id
 * @access  Private
 */
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    throw new ApiError('Skill category not found', 404);
  }

  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Skill category deleted successfully',
  });
});

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
