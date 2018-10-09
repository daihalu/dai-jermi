const User = require('./model');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('./utils');

exports.findUser = (username) => {
    return User.findOne({ username }).lean().exec();
};

exports.createUser = (data) => {
    const { username, password } = data;
    const user = new User({ username, password, role: 'user' });
    return user.save();
};

exports.signUserIn = (user) => {
    const accessToken = generateAccessToken({
        username: user.username,
        password: user.password,
        role: user.role
    });
    return User.findByIdAndUpdate(user._id,
        { $set: { accessToken }},
        { new: true, runValidators: true }
    ).exec();
};

exports.comparePassword = (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
};

exports.changePassword = (username, password) => {
    return User.findOne({ username })
        .then(user => {
            if (user) {
                user.password = password;
                return user.save();
            }
        });
};

exports.changeRole = (username, role) => {
    return User.findOne({ username })
        .then(user => {
            if (user) {
                user.role = role;
                user.accessToken = generateAccessToken({
                    username: user.username,
                    password: user.password,
                    role
                });
                return user;
            }
        })
        .then(user => {
            if (user) {
                return User.updateOne(
                        { username },
                        { $set: { role: user.role, accessToken: user.accessToken }},
                        { runValidators: true }
                    )
                    .exec()
                    .then(res => {
                        return res.nModified === 1;
                    })
                    .catch(err => console.log(err));
            }
        });
};
