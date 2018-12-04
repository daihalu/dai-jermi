const PostController = require('../routes/posts/controller');
const syncSlugs = require('../tasks/sync-slugs');

exports.syncSlugs = (req, res, next) => {
  syncSlugs();
  next();
};

exports.increaseViews = (req, res, next) => {
  PostController.increaseViews(req.postId);
  next();
};
