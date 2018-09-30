const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('./utils');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'user'] },
    accessToken: String
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            this.accessToken = generateAccessToken({
                username: this.username,
                password: this.password,
                role: this.role
            });
            next();
        })
        .catch(err => next(err));
});

module.exports = mongoose.model('user', userSchema);
