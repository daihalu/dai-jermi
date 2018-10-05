const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        req.token = { err: { message: 'No access token' } };
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            req.token = { err };
            return next();
        }

        req.token = { value: token, decoded };
        next();
    });
};
