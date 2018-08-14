const Redis = require('../databases/redis');
const { createKey } = require('../utils/redis');

exports.getPosts = async (req, res, next) => {
    const key = createKey(req.query);
    const cachedPosts = await Redis.get(key);
    if (cachedPosts) {
        const posts = JSON.parse(cachedPosts);
        res.status(200).json({ _total: posts.length, posts });
    }
    else {
        req.key = key;
        next();
    }
};

exports.getPost = async (req, res, next) => {
    const key = 'post:' + req.params.id;
    const cachedPost = await Redis.get(key);
    if (cachedPost) {
        const post = JSON.parse(cachedPost);
        res.status(200).json({ _found: true, post });
    }
    else {
        req.key = key;
        next();
    }
};
