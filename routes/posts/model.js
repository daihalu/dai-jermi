const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    tags: [String],
    views: { type: Number, default: 0 },
    readTime: Number,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    _approved: { type: Boolean, default: false },
    _slug: String,
    __v: { type: Number, select: false }
});

module.exports = mongoose.model('post', postSchema);
