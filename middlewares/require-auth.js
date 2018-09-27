const jwt = require('jsonwebtoken');
const UserController = require('../routes/users/controller');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Failed to authenticate' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate' });
        }

        const { username } = decoded;
        const user = await UserController.findUser(username);
        if (!user) {
            return res.status(401).json({ error: 'No such user' });
        }

        if (token !== user.accessToken) {
            return res.status(401).json({ error: 'Invalid access token' });
        }

        req.currentUser = username;
        next();
    });
};
