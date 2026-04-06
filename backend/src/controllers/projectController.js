const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { uploadToCloudinary, deleteFromCloudinary } = require('../services/uploadService');

/**
 * @desc    Get all projects (with pagination & filtering)
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build filter
  const filter = {};
  if (req.query.featured === 'true') filter.featured = true;
  if (req.query.featured === 'false') filter.featured = false;

  const [projects, total] = await Promise.all([
    Project.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: projects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * @desc    Get single project
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new ApiError('Project not found', 404);
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * @desc    Create project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = asyncHandler(async (req, res) => {
  const projectData = { ...req.body };

  // Handle image upload
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');
    projectData.image = { url: result.url, publicId: result.publicId };
  }

  // Handle techStack if it comes as a string
  if (typeof projectData.techStack === 'string') {
    projectData.techStack = projectData.techStack.split(',').map((s) => s.trim()).filter(Boolean);
  }

  const project = await Project.create(projectData);

  res.status(201).json({
    success: true,
    data: project,
  });
});

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);
  if (!project) {
    throw new ApiError('Project not found', 404);
  }

  const updateData = { ...req.body };

  // Handle image upload — delete old image if replacing
  if (req.file) {
    if (project.image?.publicId) {
      await deleteFromCloudinary(project.image.publicId);
    }
    const result = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');
    updateData.image = { url: result.url, publicId: result.publicId };
  }

  // Handle techStack if it comes as a string
  if (typeof updateData.techStack === 'string') {
    updateData.techStack = updateData.techStack.split(',').map((s) => s.trim()).filter(Boolean);
  }

  project = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new ApiError('Project not found', 404);
  }

  // Delete associated Cloudinary image
  if (project.image?.publicId) {
    await deleteFromCloudinary(project.image.publicId);
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
