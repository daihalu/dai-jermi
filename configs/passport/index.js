const passport = require('passport');

passport.use(require('./local-strategy'));
passport.use(require('./jwt-strategy'));

module.exports = app => app.use(passport.initialize());
