const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      trim: true,
      maxlength: [5000, 'Bio cannot exceed 5000 characters'],
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
      maxlength: [1000, 'Summary cannot exceed 1000 characters'],
    },
    avatar: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: '',
    },
    socialLinks: {
      github: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' },
      twitter: { type: String, trim: true, default: '' },
      website: { type: String, trim: true, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('About', aboutSchema);
