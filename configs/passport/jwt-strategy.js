const { pick } = require('lodash');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../../routes/users/model');

module.exports = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, (payload, done) => {
  const conditions = pick(payload, ['_id', 'username', 'password', 'role']);
  User.findOne(conditions)
    .then((user) => {
      if (!user) {
        done(null, false, { message: 'Invalid access token' });
      } else {
        done(null, user);
      }
    })
    .catch(err => done(err));
});
