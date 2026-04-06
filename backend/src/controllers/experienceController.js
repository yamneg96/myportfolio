const Experience = require('../models/Experience');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

/**
 * @desc    Get all experiences
 * @route   GET /api/experience
 * @access  Public
 */
const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1, startDate: -1 });

  res.status(200).json({
    success: true,
    data: experiences,
  });
});

/**
 * @desc    Get single experience
 * @route   GET /api/experience/:id
 * @access  Public
 */
const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    throw new ApiError('Experience not found', 404);
  }

  res.status(200).json({
    success: true,
    data: experience,
  });
});

/**
 * @desc    Create experience
 * @route   POST /api/experience
 * @access  Private
 */
const createExperience = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  // Convert date strings
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate && data.endDate !== '') {
    data.endDate = new Date(data.endDate);
  } else {
    data.endDate = null;
  }

  const experience = await Experience.create(data);

  res.status(201).json({
    success: true,
    data: experience,
  });
});

/**
 * @desc    Update experience
 * @route   PUT /api/experience/:id
 * @access  Private
 */
const updateExperience = asyncHandler(async (req, res) => {
  let experience = await Experience.findById(req.params.id);
  if (!experience) {
    throw new ApiError('Experience not found', 404);
  }

  const data = { ...req.body };

  // Convert date strings
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate === '' || data.endDate === null) {
    data.endDate = null;
  } else if (data.endDate) {
    data.endDate = new Date(data.endDate);
  }

  experience = await Experience.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: experience,
  });
});

/**
 * @desc    Delete experience
 * @route   DELETE /api/experience/:id
 * @access  Private
 */
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    throw new ApiError('Experience not found', 404);
  }

  await experience.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Experience deleted successfully',
  });
});

module.exports = {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
