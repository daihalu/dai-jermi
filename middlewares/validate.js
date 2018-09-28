const PostController = require('../routes/posts/controller');

const validateApproved = (approved) => {
    return approved === undefined ? true : (approved === 'true');
};

const validatePage = (page) => {
    page = parseInt(page);
    return (!page || page < 0) ? 1 : page;
};

const validatePageSize = (pageSize) => {
    pageSize = parseInt(pageSize);
    return (!pageSize || pageSize < 0) ? 10 : pageSize;
};

exports.getPosts = (req, res, next) => {
    const { approved, page, pageSize, year, month, date } = req.query;
    req.query.approved = validateApproved(approved);
    req.query.page     = validatePage(page);
    req.query.pageSize = validatePageSize(pageSize);
    req.query.year     = parseInt(year);
    req.query.month    = parseInt(month);
    req.query.date     = parseInt(date);
    next();
};

exports.postApproval = async (req, res, next) => {
    const post = await PostController.getPost(req.params.id);
    req.postApproved = post._approved;
    next();
};
