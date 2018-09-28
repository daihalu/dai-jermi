const PostController = require('../routes/posts/controller');
const { saveHash } = require('../utils/redis');

module.exports = () => {
    PostController.getSlugs()
        .then(posts => posts.reduce((previous, post) => [
            ...previous,
            post._slug,
            post._id.toString()
        ], []))
        .then(slugs => saveHash(slugs, 'slugs'))
        .then(num => console.log('slugs synced:', num))
        .catch(err => console.log(err));
};
