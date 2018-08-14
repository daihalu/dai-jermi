const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    content: String,
    _updatedDate: Date,
    _views: Number,
    _estimatedReadTime: Number
});

module.exports = mongoose.model('post', postSchema);
