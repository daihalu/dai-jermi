/* eslint-disable no-param-reassign */

const { uniq, kebabCase } = require('lodash');
const Post = require('./model');
const {
  removeFalsey,
  parseConditions,
  parseProjection,
  parseSort,
  parsePagination,
  estimateReadTime,
} = require('./utils');
const { slugify } = require('../../utils/string');
const log = require('../../configs/log');

exports.getPosts = (query) => {
  const conditions = parseConditions(query);
  const projection = parseProjection(query);
  const sort = parseSort(query);
  const { page, size } = parsePagination(query);
  return Post.find(conditions, projection)
    .limit(size)
    .skip((page - 1) * size)
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

exports.getSlugs = () => Post.find({}, { slug: 1 }).lean().exec();

exports.getPost = (id, query) => {
  const projection = query ? parseProjection(query) : undefined;
  return Post.findById(id, projection).lean().exec();
};

exports.createPost = (body) => {
  const {
    title,
    author,
    intro,
    content,
    tags,
  } = body;
  const post = new Post({
    title,
    author,
    intro,
    content,
    tags: tags.map(e => kebabCase(e)),
    readTime: estimateReadTime(content.split(' ').length),
    slug: slugify(title),
  });
  return post.save().then(p => p.toObject());
};

exports.updatePost = (id, body) => {
  const {
    title,
    intro,
    content,
    tags,
  } = body;
  const changes = removeFalsey({
    title,
    intro,
    content,
    tags: tags ? tags.map(e => kebabCase(e)) : undefined,
    readTime: content ? estimateReadTime(content.split(' ').length) : undefined,
    slug: title ? slugify(title) : undefined,
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
  { approved: approval },
  { new: true },
).lean().exec();

exports.deletePost = id => Post.findByIdAndDelete(id).lean().exec();
