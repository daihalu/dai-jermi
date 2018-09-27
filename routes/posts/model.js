const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    tags: [String],
    _slug: String,
    _createdAt: Date,
    _updatedAt: Date,
    _views: Number,
    _estimatedReadTime: Number,
    _approved: Boolean,
    __v: { type: Number, select: false }
});

module.exports = mongoose.model('post', postSchema);
