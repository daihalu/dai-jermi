const Post = require('./model');
const {
    removeFalsey,
    createFindConditions,
    createFindProjection,
    createSortConditions,
    estimateReadTime
} = require('./utils');

exports.getPosts = (query) => {
    const conditions = createFindConditions(query);
    const projection = createFindProjection(query);
    const sort = createSortConditions(query);
    const pageSize = parseInt(query.pageSize) || 10;
    return Post.find(conditions, projection)
        .limit(pageSize)
        .sort(sort)
        .lean()
        .exec();
};

exports.getPost = (id) => {
    return Post.findById(id)
        .lean()
        .exec();
};

exports.createPost = (body) => {
    const { title, author, category, content } = body;
    const post = new Post({
        title,
        author,
        category,
        content,
        _updatedDate: new Date(),
        _views: 0,
        _estimatedReadTime: content ? estimateReadTime(content.split(' ').length) : 0,
        _approved: false
    });
    return post.save();
};

exports.updatePost = (id, body) => {
    const { title, category, content } = body;
    const changes = removeFalsey({
        title,
        category,
        content,
        _updatedDate: new Date(),
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
