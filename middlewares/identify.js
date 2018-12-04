const PostController = require('../routes/posts/controller');

exports.approvedPost = async (req, res, next) => {
    try {
        const post = await PostController.getPost(req.params.id);
        req.postApproved = post._approved;
        next();
    } catch (err) {
        next(err);
    }
};

exports.adminRequest = (req, res, next) => {
    req.adminRequest = req.user ? req.user.role === 'admin' : false;
    next();
};
