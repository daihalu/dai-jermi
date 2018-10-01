const Redis = require('../databases/redis');
const { createKey } = require('../utils/redis');

exports.getPosts = async (req, res, next) => {
    const key = createKey(req.query);
    const cachedPosts = await Redis.get(key);
    if (!req.adminRequest && cachedPosts) {
        const posts = JSON.parse(cachedPosts);
        res.status(200).json({ _total: posts.length, posts });
    }
    else {
        req.key = key;
        next();
    }
};

exports.getPostTags = async (req, res, next) => {
    const key = 'post-tags';
    const cachedTags = await Redis.get(key);
    if (cachedTags) {
        const tags = JSON.parse(cachedTags);
        res.status(200).json({ _total: tags.length, tags });
    }
    else {
        req.key = key;
        next();
    }
};

exports.getPost = async (req, res, next) => {
    const id = await Redis.hget('slugs', req.params.id) || req.params.id;
    const key = 'post:' + id;
    const cachedPost = await Redis.get(key);
    if (cachedPost) {
        const post = JSON.parse(cachedPost);
        res.status(200).json({ post });
        req.sentCache = true;
    }
    else {
        req.key = key;
    }
    req.postId = id;
    next();
};

exports.saveCache = async (req, res, next) => {
    if (!req.sentCache) Redis.setex(req.key, req.expiresIn, JSON.stringify(req.data));
    next();
};
