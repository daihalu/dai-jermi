const PostController = require('../routes/posts/controller');
const UserController = require('../routes/users/controller');
const syncSlugs = require('../tasks/sync-slugs');

exports.syncSlugs = (req, res, next) => {
    syncSlugs();
    next();
};

exports.increaseViews = (req, res, next) => {
    PostController.increaseViews(req.postId);
    next();
};

exports.addPostToUser = (req, res, next) => {
    UserController.addPost(req.currentUser, req.postId);
    next();
};

exports.removePostFromUser = (req, res, next) => {
    UserController.removePost(req.currentUser, req.params.id);
    next();
};
