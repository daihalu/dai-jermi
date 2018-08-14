const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('./utils');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    accessToken: String,
    posts: [{ _id: mongoose.Schema.Types.ObjectId }]
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            this.accessToken = generateAccessToken({
                username: this.username,
                password: this.password
            });
            next();
        })
        .catch(err => next(err));
});

module.exports = mongoose.model('user', userSchema);
