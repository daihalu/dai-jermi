const PostController = require('../routes/posts/controller');
const { replaceHash } = require('../utils/redis');
const logger = require('../config/log');

module.exports = () => {
    PostController.getSlugs()
        .then(posts => posts.reduce((previous, post) => [
            ...previous,
            post._slug,
            post._id.toString()
        ], []))
        .then(slugs => slugs.length > 0 ? replaceHash(slugs, 'slugs') : 0)
        .then(num => logger.info(`${num} slugs synced`))
        .catch(err => logger.error(err));
};
