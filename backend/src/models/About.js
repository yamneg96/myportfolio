const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      trim: true,
      maxlength: [5000, 'Bio cannot exceed 5000 characters'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [1000, 'Summary cannot exceed 1000 characters'],
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
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
