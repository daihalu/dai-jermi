const PostController = require('../routes/api/posts/controller');
const UserController = require('../routes/api/users/controller');

exports.increaseViews = async (req, res, next) => {
    await PostController.increaseViews(req.params.id);
};

exports.addPostToUser = async (req, res, next) => {
    await UserController.addPost(req.currentUser, req.postId);
};

exports.removePostFromUser = async (req, res, next) => {
    await UserController.removePost(req.currentUser, req.params.id);
};
