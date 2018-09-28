const _ = require('lodash');
const Post = require('./model');
const {
    removeFalsey,
    parseConditions,
    parseProjection,
    parseSort,
    estimateReadTime
} = require('./utils');

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

exports.getPostTags = () => {
    return Post.find({}, { tags: 1 })
        .then(posts => {
            const tags = posts.reduce((acc, cur) => [...acc, ...cur.tags], []);
            return _.uniq(tags);
        })
        .catch(err => {
            console.log(err);
            return [];
        });
};

exports.getPost = (id) => {
    return Post.findById(id)
        .lean()
        .exec();
};

exports.createPost = (body) => {
    const { title, author, content, tags } = body;
    const post = new Post({
        title,
        author,
        content,
        tags: tags ? tags.map(e => _.kebabCase(e)) : [],
        _estimatedReadTime: content ? estimateReadTime(content.split(' ').length) : 0
    });
    return post.save();
};

exports.updatePost = (id, body) => {
    const { title, content, tags } = body;
    const changes = removeFalsey({
        title,
        content,
        tags: tags ? tags.map(e => _.kebabCase(e)) : undefined,
        _updatedAt: new Date(),
        _estimatedReadTime: content ? estimateReadTime(content.split(' ').length) : undefined
    });
    return Post.findByIdAndUpdate(id, changes, { new: true })
        .lean()
        .exec();
};

exports.increaseViews = (id) => {
    return Post.findById(id, { _views: 1 })
        .then(post => {
            if (post) {
                post._views = ++post._views;
                post.save();
                return post.toObject();
            }
        })
        .catch(err => console.log(err));
};

exports.approvePost = (id, approval) => {
    return Post.findByIdAndUpdate(id, { _approved: approval }, { new: true })
        .lean()
        .exec();
};

exports.deletePost = (id) => {
    return Post.findByIdAndDelete(id)
        .lean()
        .exec();
};
