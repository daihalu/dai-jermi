const PostController = require('../routes/posts/controller');
const UserController = require('../routes/users/controller');
const syncSlugs = require('../tasks/sync-slugs');

exports.syncSlug = async (req, res, next) => {
    syncSlugs();
    next();
};

exports.increaseViews = async (req, res, next) => {
    await PostController.increaseViews(req.params.id);
    next();
};

exports.addPostToUser = async (req, res, next) => {
    await UserController.addPost(req.currentUser, req.postId);
    next();
};

exports.removePostFromUser = async (req, res, next) => {
    await UserController.removePost(req.currentUser, req.params.id);
    next();
};
