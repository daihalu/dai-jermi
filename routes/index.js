const users = require('./users');
const posts = require('./posts');
const logger = require('../config/log');

module.exports = (app) => {
    app.use('/users', users);
    app.use('/posts', posts);

    app.use((err, req, res, next) => {
        res.status(err.status || 500).end();
        logger.error(err);
    });
};
