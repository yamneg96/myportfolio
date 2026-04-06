const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    techStack: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: (v) => v.length > 0,
        message: 'Tech stack must have at least one item',
      },
    },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    liveLink: {
      type: String,
      trim: true,
      default: '',
    },
    githubLink: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting and filtering
projectSchema.index({ featured: 1, order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
