/* eslint-disable no-param-reassign */

const bcrypt = require('bcrypt');
const User = require('./model');

exports.findUser = username => User.findOne({ username }).lean().exec();

exports.createUser = (data) => {
  const { username, password } = data;
  const user = new User({ username, password });
  return user.save();
};

exports.comparePassword = (plain, hashed) => bcrypt.compare(plain, hashed);

exports.changePassword = (id, password) => User.findById(id)
  .then((user) => {
    if (user) {
      user.password = password;
      return user.save();
    }
  });

exports.changeRole = (id, role) => User.findByIdAndUpdate(
  id,
  { role },
  { new: true, runValidators: true },
).exec();
