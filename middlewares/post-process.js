/* eslint-disable no-unused-vars */

const PostController = require('../routes/posts/controller');
const { sync } = require('../tasks/sync-slugs');

exports.syncSlugs = (req, res) => {
  sync();
};

exports.increaseViews = (req, res) => {
  PostController.increaseViews(req.postId);
};
