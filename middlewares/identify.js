const PostController = require('../routes/posts/controller');

exports.publishedPost = async (req, res, next) => {
  try {
    const post = await PostController.getPost(req.params.id);
    req.postPublished = post.status === 'published';
    next();
  } catch (err) {
    next(err);
  }
};

exports.adminRequest = (req, res, next) => {
  req.adminRequest = req.user ? req.user.role === 'admin' : false;
  next();
};
