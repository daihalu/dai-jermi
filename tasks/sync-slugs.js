const PostController = require('../routes/posts/controller');
const { replaceHash } = require('../utils/redis');
const log = require('../configs/log');

const sync = () => {
  PostController.getSlugs()
    .then(posts => posts.reduce((previous, post) => [
      ...previous,
      post.slug,
      post._id.toString(),
    ], []))
    .then(slugs => (slugs.length > 0 ? replaceHash(slugs, 'slugs') : 0))
    .then(num => log.info(`${num} slugs synced`))
    .catch(err => log.error(err));
};

const start = () => {
  sync();
  setTimeout(start, parseInt(process.env.SLUG_SYNC_INTERVAL, 10));
};

module.exports = {
  sync,
  start,
};
