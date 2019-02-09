const jwt = require('jsonwebtoken');
const log = require('../configs/log');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next();
  jwt.verify(token.split('Bearer ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      log.error(err);
      return next();
    }
    req.user = decoded;
    next();
  });
};
