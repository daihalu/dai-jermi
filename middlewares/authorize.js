const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(403).json({ error: info.message });
    req.user = user;
    next();
  })(req, res, next);
};
