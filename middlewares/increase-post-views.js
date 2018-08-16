const PostController = require('../routes/api/posts/controller');

module.exports = async (req, res, next) => {
    await PostController.increaseViews(req.params.id);
};
