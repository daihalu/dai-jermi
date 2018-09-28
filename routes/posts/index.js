const express = require('express');
const Controller = require('./controller');
const validate = require('../../middlewares/validate');
const cached = require('../../middlewares/cached');
const permission = require('../../middlewares/check-permission');
const postProcess = require('../../middlewares/post-process');
const requireAuth = require('../../middlewares/require-auth');

const router = express.Router();

const getPosts = async (req, res, next) => {
    try {
        const posts = await Controller.getPosts(req.query);
        res.status(200).json({ _total: posts.length, posts });
        req.expiresIn = 60;
        req.data = posts;
        next();
    } catch (err) {
        next(err);
    }
};

const getPostTags = async (req, res, next) => {
    try {
        const tags = await Controller.getPostTags();
        res.status(200).json({ _total: tags.length, tags });
        req.expiresIn = 60 * 60;
        req.data = tags;
        next();
    } catch (err) {
        next(err);
    }
};

const getPost = async (req, res, next) => {
    if (req.sentCache) return next();

    try {
        const post = await Controller.getPost(req.postId);
        if (post) {
            res.status(200).json({ post });
            req.expiresIn = 60;
            req.data = post;
            next();
        }
        else {
            res.status(404).json({ post: {} });
        }
    } catch (err) {
        next(err);
    }
};

const createPost = async (req, res, next) => {
    req.body.author = req.currentUser;
    try {
        const post = await Controller.createPost(req.body);
        res.status(201).json({ post });
        req.postId = post._id;
        next();
    } catch (err) {
        next(err);
    }
};

const updatePost = async (req, res, next) => {
    if (req.postApproved && !req.adminRequest) {
        return res.status(403).json({ error: 'No access permission' });
    }

    const { id } = req.params;
    try {
        const post = await Controller.updatePost(id, req.body);
        if (post) {
            res.status(200).json({ _updated: true, post });
            next();
        }
        else {
            res.status(400).json({ _updated: false });
        }
    } catch (err) {
        next(err);
    }
};

const approvePost = async (req, res, next) => {
    if (!req.adminRequest) {
        return res.status(403).json({ error: 'No access permission' });
    }

    const { id } = req.params;
    try {
        const post = await Controller.approvePost(id, req.body.approval);
        if (post) {
            res.status(200).json({ _updated: true, post });
        }
        else {
            res.status(400).json({ _updated: false });
        }
    } catch (err) {
        next(err);
    }
};

const deletePost = async (req, res, next) => {
    if (!req.adminRequest) {
        return res.status(403).json({ error: 'No access permission' });
    }

    const { id } = req.params;
    try {
        const post = await Controller.deletePost(id);
        if (post) {
            res.status(200).json({ _deleted: true, post });
            next();
        }
        else {
            res.status(400).json({ _deleted: false });
        }
    } catch (err) {
        next(err);
    }
};

router.get('/', validate.getPosts, cached.getPosts, getPosts, cached.saveCache);
router.get('/tags', cached.getPostTags, getPostTags, cached.saveCache);
router.get('/:id', cached.getPost, getPost, cached.saveCache, postProcess.increaseViews);
router.post('/', requireAuth, createPost, postProcess.syncSlugs, postProcess.addPostToUser);
router.put('/:id', requireAuth, validate.postApproval, permission.admin, permission.postOwner, updatePost, postProcess.syncSlugs);
router.put('/:id/approval', requireAuth, permission.admin, approvePost);
router.delete('/:id', requireAuth, permission.admin, deletePost, postProcess.removePostFromUser);

module.exports = router;
