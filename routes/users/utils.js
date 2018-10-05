const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
};
