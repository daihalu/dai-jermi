const UserController = require('../routes/users/controller');

exports.admin = (req, res, next) => {
    const token = req.token;
    if (token.err) {
        return res.status(403).json({ error: 'No access permission' });
    }

    const { role } = token.decoded;
    if (role === 'admin') req.adminRequest = true;
    next();
};

exports.accountOwner = (req, res, next) => {
    const token = req.token;
    if (token.err) {
        return res.status(403).json({ error: 'No access permission' });
    }

    const { username } = token.decoded;
    if (username !== req.params.username) {
        return res.status(403).json({ error: 'No access permission' });
    }
    next();
};

exports.postOwner = async (req, res, next) => {
    if (req.adminRequest) return next();
    const posts = await UserController.getPosts(req.currentUser);
    if (posts) {
        const postIds = posts.map(e => e._id.toString());
        if (!postIds.includes(req.params.id)) {
            return res.status(403).json({ error: 'No access permission' });
        }
    }
    next();
};
