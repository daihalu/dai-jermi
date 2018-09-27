const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

exports.generateAccessToken = (user) => {
    return jwt.sign(user, JWT_SECRET);
};
