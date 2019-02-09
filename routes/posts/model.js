const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  status: { type: String, enum: ['editing', 'published', 'deleted'], default: 'editing' },
  title: String,
  author: String,
  intro: String,
  content: String,
  tags: [String],
  readTime: { type: Number, min: 1 },
  views: { type: Number, min: 0, default: 0 },
  slug: String,
  __v: { type: Number, select: false },
}, {
  timestamps: true,
  toObject: { versionKey: false },
});

module.exports = mongoose.model('post', postSchema);
