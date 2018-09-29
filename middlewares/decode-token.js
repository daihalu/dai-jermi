const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        req.token = { err: { message: 'No access token' } };
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            req.token = { err };
            return next();
        }

        req.token = { value: token, decoded };
        next();
    });
};
