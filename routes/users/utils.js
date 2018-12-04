const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};
