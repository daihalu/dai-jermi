const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../../routes/users/model');

module.exports = new Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    User.findOne({ username })
        .then(async user => {
            if (!user) {
                done(null, false, { message: 'Incorrect username' });
            } else if (!await bcrypt.compare(password, user.password)) {
                done(null, false, { message: 'Incorrect password' });
            } else {
                done(null, user);
            }
        })
        .catch(err => done(err));
});
