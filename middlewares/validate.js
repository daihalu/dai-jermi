const validateApproved = (_approved) => {
    return _approved === undefined ? true : (_approved === 'true');
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
    req.query._approved = validateApproved(req.query._approved);
    req.query.page = validatePage(req.query.page);
    req.query.pageSize = validatePageSize(req.query.pageSize);
    next();
};
