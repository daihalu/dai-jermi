const User = require('./model');
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;

exports.findUser = (username) => {
    return User.findOne({ username })
        .lean()
        .exec();
};

exports.createUser = (data) => {
    const { username, password } = data;
    const user = new User({ username, password });
    return user.save();
};

exports.comparePassword = (plain, hashed) => {
    return bcrypt.compare(plain, hashed)
        .then(isMatch => isMatch)
        .catch(err => {
            console.log(err);
            return false;
        });
};

exports.changePassword = (username, password) => {
    return User.findOne({ username })
        .then(user => {
            if (user) {
                user.password = password;
                return user.save();
            }
        })
        .catch(err => console.log(err));
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
                user.posts.shift(new ObjectId(id));
                User.update({ username }, { $set: { posts: user.posts }}).exec();
                return user.posts;
            }
        })
        .catch(err => console.log(err));
};
