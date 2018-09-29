const UserController = require('../routes/users/controller');

module.exports = async (req, res, next) => {
    const token = req.token;
    if (token.err) {
        return res.status(401).json({ error: 'Failed to authenticate' });
    }

    const { username } = token.decoded;
    const user = await UserController.findUser(username);
    if (!user) {
        return res.status(401).json({ error: 'No such user' });
    }
    if (token.value !== user.accessToken) {
        return res.status(401).json({ error: 'Invalid access token' });
    }

    req.currentUser = username;
    next();
};
