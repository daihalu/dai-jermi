/* eslint-disable no-unused-vars */

const users = require('./users');
const posts = require('./posts');
const log = require('../configs/log');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/posts', posts);

  app.use((err, req, res, next) => {
    res.status(err.status || 500).end();
    log.error(err);
  });
};
