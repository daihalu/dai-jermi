const { Strategy } = require('passport-local');
const User = require('../../routes/users/model');
const UserController = require('../../routes/users/controller');

module.exports = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  User.findOne({ username })
    .then(async (user) => {
      if (!user) {
        done(null, false, { message: 'Incorrect username or password' });
      } else if (!await UserController.comparePassword(password, user.password)) {
        done(null, false, { message: 'Incorrect password or password' });
      } else {
        done(null, user);
      }
    })
    .catch(err => done(err));
});
