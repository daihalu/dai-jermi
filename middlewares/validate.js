exports.getPosts = (req, res, next) => {
    const _approved = req.query._approved;
    req.query._approved = _approved === undefined ? true : (_approved === 'true');
    next();
};
