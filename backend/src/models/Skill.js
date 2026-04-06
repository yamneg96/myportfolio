const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    icon: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: true }
);

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['frontend', 'backend', 'mobile', 'ai', 'devops', 'tools', 'other'],
      trim: true,
    },
    items: {
      type: [skillItemSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: 'At least one skill item is required',
      },
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

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
