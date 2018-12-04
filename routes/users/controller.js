const User = require('./model');
const bcrypt = require('bcrypt');

exports.findUser = (username) => {
    return User.findOne({ username }).lean().exec();
};

exports.createUser = (data) => {
    const { username, password } = data;
    const user = new User({ username, password, role: 'user' });
    return user.save();
};

exports.comparePassword = (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
};

exports.changePassword = (user, password) => {
    return User.findById(user._id)
        .then(user => {
            if (user) {
                user.password = password;
                return user.save();
            }
        });
};

exports.changeRole = (user, role) => {
    return User.findByIdAndUpdate(user._id,
        { $set: { role }},
        { new: true, runValidators: true }
    ).exec();
};
