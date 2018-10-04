const PostController = require('../routes/posts/controller');

const checkAccountOwner = (req, res, next) => {
    const token = req.token;
    if (!token.err) {
        const { username } = token.decoded;
        if (username === req.params.username) return next();
    }

    res.status(403).json({ error: 'No access permission' });
};

const checkAdmin = (req, res, next) => {
    const token = req.token;
    if (!token.err) {
        const { role } = token.decoded;
        if (role === 'admin') return next();
    }

    res.status(403).json({ error: 'No access permission' });
};

const checkAdminOrPostOwner = async (req, res, next) => {
    const token = req.token;
    if (!token.err) {
        const { role, username } = token.decoded;
        if (role === 'admin') return next();

        const post = await PostController.getPost(req.params.id);
        if (username === post.author) return next();
    }

    res.status(403).json({ error: 'No access permission' });
};

module.exports = (permissions) => {
    if (!Array.isArray(permissions)) permissions = permissions.split(',');

    if (permissions.includes('accountOwner')) {
        return checkAccountOwner;
    }
    if (permissions.includes('admin') && permissions.includes('postOwner')) {
        return checkAdminOrPostOwner;
    }
    if (permissions.includes('admin')) {
        return checkAdmin;
    }
};
