const About = require('../models/About');
const asyncHandler = require('../utils/asyncHandler');
const { uploadToCloudinary, deleteFromCloudinary } = require('../services/uploadService');

/**
 * @desc    Get about info (singleton)
 * @route   GET /api/about
 * @access  Public
 */
const getAbout = asyncHandler(async (req, res) => {
  // Return the single about document, or an empty default
  let about = await About.findOne();

  if (!about) {
    about = {
      bio: '',
      summary: '',
      avatar: { url: '', publicId: '' },
      resumeUrl: '',
      socialLinks: { github: '', linkedin: '', twitter: '', website: '' },
    };
  }

  res.status(200).json({
    success: true,
    data: about,
  });
});

/**
 * @desc    Update about info (upsert — create if not exists)
 * @route   PUT /api/about
 * @access  Private
 */
const updateAbout = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  // Parse socialLinks if it comes as a JSON string (from multipart form)
  if (typeof updateData.socialLinks === 'string') {
    try {
      updateData.socialLinks = JSON.parse(updateData.socialLinks);
    } catch {
      // Leave as-is, Mongoose validation will catch issues
    }
  }

  // Handle avatar upload
  if (req.file) {
    const existing = await About.findOne();
    if (existing?.avatar?.publicId) {
      await deleteFromCloudinary(existing.avatar.publicId);
    }
    const result = await uploadToCloudinary(req.file.buffer, 'portfolio/about');
    updateData.avatar = { url: result.url, publicId: result.publicId };
  }

  const about = await About.findOneAndUpdate({}, updateData, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: about,
  });
});

module.exports = { getAbout, updateAbout };
