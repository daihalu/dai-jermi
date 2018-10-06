const PostController = require('../routes/posts/controller');

exports.postApproval = async (req, res, next) => {
    try {
        const post = await PostController.getPost(req.params.id);
        req.postApproved = post._approved;
        next();
    } catch (err) {
        next(err);
    }
};

exports.adminRequest = (req, res, next) => {
    const token = req.token;
    req.adminRequest = token.decoded ? token.decoded.role === 'admin' : false;
    next();
};
