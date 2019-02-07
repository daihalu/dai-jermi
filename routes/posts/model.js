const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  intro: String,
  content: String,
  tags: [String],
  readTime: Number,
  views: { type: Number, min: 0, default: 0 },
  approved: { type: Boolean, default: false },
  slug: String,
  __v: { type: Number, select: false },
}, {
  timestamps: true,
  toObject: { versionKey: false },
});

module.exports = mongoose.model('post', postSchema);
