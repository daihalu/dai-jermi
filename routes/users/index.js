const express = require('express');
const Controller = require('./controller');
const decodeToken = require('../../middlewares/decode-token');
const requireAuth = require('../../middlewares/require-auth');
const permission = require('../../middlewares/permission');

const router = express.Router();

const signUp = async (req, res, next) => {
    try {
        const existingUser = await Controller.findUser(req.body.username);
        if (existingUser) {
            res.status(400).json({ error: 'Username already exists' });
        }
        else {
            const user = await Controller.createUser(req.body);
            res.json({ username: user.username, accessToken: user.accessToken });
        }
    } catch (err) {
        next(err);
    }
};

const signIn = async (req, res, next) => {
    try {
        const user = await Controller.findUser(req.body.username);
        if (!user) {
            return res.status(401).json({ error: 'Incorrect username' });
        }

        const isMatch = await Controller.comparePassword(req.body.password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Incorrect password' });
        }
        else {
            res.json({ username: user.username, accessToken: user.accessToken });
        }
    } catch (err) {
        next(err);
    }
};

const changePassword = async (req, res, next) => {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await Controller.findUser(username);
        if (!user) {
            return res.status(400).json({ error: 'No such user' });
        }

        const isMatch = await Controller.comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const successful = await Controller.changePassword(username, newPassword);
        if (successful) {
            res.status(200).json({ accessToken: successful.accessToken })
        }
        else {
            res.status(500).json({ error: 'Cannot change password' });
        }
    } catch (err) {
        next(err);
    }
};

const changeRole = async (req, res, next) => {
    if (!req.adminRequest) {
        return res.status(403).json({ error: 'No access permission' });
    }

    try {
        const successful = await Controller.changeRole(req.params.username, req.body.role);
        if (successful) {
            res.status(200).json({ _updated: true })
        }
        else {
            res.status(400).json({ _updated: false });
        }
    } catch (err) {
        next(err);
    }
};

router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/:username/password', decodeToken, requireAuth, permission.accountOwner, changePassword);
router.put('/:username/role', decodeToken, requireAuth, permission.admin, changeRole);

module.exports = router;
