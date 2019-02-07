/* eslint-disable global-require,no-unused-vars */

const log = require('../configs/log');

module.exports = (app) => {
  app.use('/users', require('./users'));
  app.use('/posts', require('./posts'));

  app.use((err, req, res, next) => {
    res.status(err.status || 500).end();
    log.error(err);
  });
};
