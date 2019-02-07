const Redis = require('../configs/db/redis');

module.exports = async (req, res, next) => {
  req.postId = await Redis.hgetAsync('slugs', req.params.id) || req.params.id;
  next();
};
