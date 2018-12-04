const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info.message });
        req.user = user;
        next();
    })(req, res, next);
};
