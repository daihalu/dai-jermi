const express = require('express');
const Controller = require('./controller');
const validators = require('../../middlewares/validators');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const permission = require('../../middlewares/permission');
const { generateAccessToken } = require('./utils');

const router = express.Router();

const signUp = async (req, res, next) => {
    try {
        const existingUser = await Controller.findUser(req.body.username);
        if (existingUser) {
            res.status(409).json({ error: 'Username already exists' });
        }
        else {
            const user = await Controller.createUser(req.body);
            const token = generateAccessToken(user.toObject());
            res.status(200).json({ username: user.username, accessToken: token });
        }
    } catch (err) {
        next(err);
    }
};

const signIn = async (req, res) => {
    const { user } = req;
    const token = generateAccessToken(user.toObject());
    res.status(200).json({ username: user.username, accessToken: token });
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
            return res.status(409).json({ error: 'Incorrect password' });
        }

        const newUser = await Controller.changePassword(user, newPassword);
        if (newUser) {
            res.status(204).end();
        }
        else {
            res.status(500).json({ error: 'Cannot change password' });
        }
    } catch (err) {
        next(err);
    }
};

const changeRole = async (req, res, next) => {
    try {
        const user = await Controller.findUser(req.params.username);
        if (!user) {
            return res.status(400).json({ error: 'No such user' });
        }

        const newUser = await Controller.changeRole(user, req.body.role);
        if (newUser) {
            res.status(204).end();
        }
        else {
            res.status(500).json({ error: 'Cannot change role' });
        }
    } catch (err) {
        next(err);
    }
};

router.post('/signup', validators.signUpSignIn, signUp);
router.post('/signin', validators.signUpSignIn, authenticate, signIn);
router.put('/:username/password', validators.changePassword, authorize, permission('accountOwner'), changePassword);
router.put('/:username/role', validators.changeRole, authorize, permission('admin'), changeRole);

module.exports = router;
