/* eslint-disable no-param-reassign */

const bcrypt = require('bcrypt');
const User = require('./model');

exports.findUser = username => User.findOne({ username }).lean().exec();

exports.createUser = (data) => {
  const { username, password } = data;
  const user = new User({ username, password, role: 'user' });
  return user.save();
};

exports.comparePassword = (plain, hashed) => bcrypt.compare(plain, hashed);

exports.changePassword = (user, password) => User.findById(user._id)
  .then((foundUser) => {
    if (foundUser) {
      foundUser.password = password;
      return foundUser.save();
    }
  });

exports.changeRole = (user, role) => User.findByIdAndUpdate(
  user._id,
  { $set: { role } },
  { new: true, runValidators: true },
).exec();
