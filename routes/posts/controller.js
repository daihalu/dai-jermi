/* eslint-disable no-param-reassign */

const { uniq, kebabCase } = require('lodash');
const Post = require('./model');
const {
  removeFalsey, parseConditions, parseProjection, parseSort, estimateReadTime,
} = require('./utils');
const { slugify } = require('../../utils/string');
const log = require('../../config/log');

exports.getPosts = (query) => {
  const conditions = parseConditions(query);
  const projection = parseProjection(query);
  const sort = parseSort(query);
  return Post.find(conditions, projection)
    .limit(query.pageSize)
    .skip((query.page - 1) * query.pageSize)
    .sort(sort)
    .lean()
    .exec();
};

exports.getPostTags = () => Post.find({}, { tags: 1 })
  .then((posts) => {
    const tags = posts.reduce((acc, cur) => [...acc, ...cur.tags], []);
    return uniq(tags);
  })
  .catch((err) => {
    log.error(err);
    return [];
  });

exports.getSlugs = () => Post.find({}, { _slug: 1 }).lean().exec();

exports.getPost = id => Post.findById(id).lean().exec();

exports.createPost = (body) => {
  const {
    title, author, content, tags,
  } = body;
  const post = new Post({
    title,
    author,
    content,
    tags: tags.map(e => kebabCase(e)),
    readTime: estimateReadTime(content.split(' ').length),
    _slug: slugify(title),
  });
  return post.save().then(p => p.toObject({ versionKey: false }));
};

exports.updatePost = (id, body) => {
  const { title, content, tags } = body;
  const changes = removeFalsey({
    title,
    content,
    tags: tags ? tags.map(e => kebabCase(e)) : undefined,
    readTime: content ? estimateReadTime(content.split(' ').length) : undefined,
    updatedAt: new Date(),
    _slug: title ? slugify(title) : undefined,
  });
  return Post.findByIdAndUpdate(id, changes, { new: true }).lean().exec();
};

exports.increaseViews = id => Post.findById(id, { views: 1 })
  .then((post) => {
    if (post) {
      post.views += 1;
      post.save();
      return post.toObject();
    }
  })
  .catch(err => log.error(err));

exports.approvePost = (id, approval) => Post.findByIdAndUpdate(
  id,
  { _approved: approval },
  { new: true },
).lean().exec();

exports.deletePost = id => Post.findByIdAndDelete(id).lean().exec();
