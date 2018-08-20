const validateApproved = (_approved) => {
    return _approved === undefined ? true : (_approved === 'true');
};

const validatePage = (page) => {
    return (!parseInt(page) || parseInt(page) < 0) ? 1 : parseInt(page);
};

const validatePageSize = (pageSize) => {
    return (!parseInt(pageSize) || parseInt(pageSize) < 0) ? 10 : parseInt(pageSize);
};

exports.getPosts = (req, res, next) => {
    req.query._approved = validateApproved(req.query._approved);
    req.query.page = validatePage(req.query.page);
    req.query.pageSize = validatePageSize(req.query.pageSize);
    next();
};
