const User = require('./model');
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;
const { generateAccessToken } = require('./utils');

exports.findUser = (username) => {
    return User.findOne({ username })
        .lean()
        .exec();
};

exports.createUser = (data) => {
    const { username, password } = data;
    const user = new User({ username, password, role: 'user' });
    return user.save();
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
                return User.update(
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

exports.getPosts = (username) => {
    return User.findOne({ username }, { posts: 1 })
        .then(user => {
            if (user) return user.posts;
        })
        .catch(err => console.log(err));
};

exports.addPost = (username, id) => {
    return User.findOne({ username }, { posts: 1 })
        .then(user => {
            if (user) {
                user.posts.push(new ObjectId(id));
                User.update({ username }, { $set: { posts: user.posts }}).exec();
                return user.posts;
            }
        })
        .catch(err => console.log(err));
};

exports.removePost = (username, id) => {
    return User.findOne({ username }, { posts: 1 })
        .then(user => {
            if (user) {
                const index = user.posts.indexOf(new ObjectId(id));
                user.posts.splice(index, 1);
                User.update({ username }, { $set: { posts: user.posts }}).exec();
                return user.posts;
            }
        })
        .catch(err => console.log(err));
};
