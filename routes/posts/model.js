const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    tags: [String],
    _slug: String,
    _createdAt: { type: Date, default: new Date() },
    _updatedAt: { type: Date, default: new Date() },
    _views: { type: Number, default: 0 },
    _estimatedReadTime: Number,
    _approved: { type: Boolean, default: false },
    __v: { type: Number, select: false }
});

module.exports = mongoose.model('post', postSchema);
