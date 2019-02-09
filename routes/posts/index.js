const express = require('express');
const Controller = require('./controller');
const validators = require('../../middlewares/validators');
const authorize = require('../../middlewares/authorize');
const decodeToken = require('../../middlewares/decode-token');
const permission = require('../../middlewares/permission');
const identify = require('../../middlewares/identify');
const lookupId = require('../../middlewares/lookup-id');
const postProcess = require('../../middlewares/post-process');

const router = express.Router();

const getPosts = async (req, res, next) => {
  const { adminRequest } = req;
  try {
    const posts = await Controller.getPosts({ ...req.query, adminRequest });
    res.status(200).json({ total: posts.length, posts });
  } catch (err) {
    next(err);
  }
};

const getPostTags = async (req, res, next) => {
  try {
    const tags = await Controller.getPostTags();
    res.status(200).json({ total: tags.length, tags });
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  const { adminRequest } = req;
  try {
    const post = await Controller.getPost(req.postId, { ...req.query, adminRequest });
    if (post) {
      res.status(200).json({ post });
      next();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  req.body.author = req.user.username;
  try {
    const post = await Controller.createPost(req.body);
    res.status(201).json({ post });
    next();
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  if (req.postPublished && !req.adminRequest) {
    return res.status(403).json({ error: 'No access permission' });
  }

  try {
    const post = await Controller.updatePost(req.postId, req.body);
    if (post) {
      res.status(200).json({ post });
      next();
    } else {
      res.status(400).end();
    }
  } catch (err) {
    next(err);
  }
};

const changePostStatus = async (req, res, next) => {
  try {
    const post = await Controller.changePostStatus(req.postId, req.body.status);
    res.status(post ? 204 : 400).end();
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Controller.deletePost(req.postId);
    res.status(post ? 204 : 400).end();
  } catch (err) {
    next(err);
  }
};

router.get('/', validators.getPosts, decodeToken, identify.adminRequest, getPosts);
router.get('/tags', getPostTags);
router.get('/:id', decodeToken, identify.adminRequest, lookupId, getPost, postProcess.increaseViews);
router.post('/', authorize, validators.createPost, createPost, postProcess.syncSlugs);
router.put('/:id', authorize, permission('admin,postOwner'), validators.updatePost, identify.publishedPost, identify.adminRequest, lookupId, updatePost, postProcess.syncSlugs);
router.put('/:id/status', authorize, permission('admin'), validators.changePostStatus, lookupId, changePostStatus);
router.delete('/:id', authorize, permission('admin'), lookupId, deletePost);

router.all('/', (req, res) => res.status(405).end());
router.all('/tags', (req, res) => res.status(405).end());
router.all('/:id', (req, res) => res.status(405).end());
router.all('/:id/status', (req, res) => res.status(405).end());

module.exports = router;
