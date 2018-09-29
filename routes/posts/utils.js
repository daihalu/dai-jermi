const _ = require('lodash');

const allowedSort = [
    'newest',     'oldest',
    'lastUpdate', '-lastUpdate',
    'views',      '-views',
    'readTime',   '-readTime'
];

exports.removeFalsey = (obj) => {
    return _.pickBy(obj, _.identity);
};

exports.parseConditions = (query) => {
    const { author, tag, year, month, date, q } = query;
    const conditions = {};

    if (author) conditions.author = author;
    if (tag) conditions.tags = tag;

    let lowerBound, upperBound;
    if (year && month && date) {
        lowerBound = new Date(year, month - 1, date);
        upperBound = new Date(year, month - 1, date + 1);
    }
    else if (year && month) {
        lowerBound = new Date(year, month - 1, 1);
        upperBound = new Date(year, month, 1);
    }
    else if (year) {
        lowerBound = new Date(year, 0, 1);
        upperBound = new Date(year + 1, 0, 1);
    }

    if (lowerBound && upperBound) conditions._createdAt = { $gte: lowerBound, $lt: upperBound };
    if (q) conditions.title = { $regex: q, $options: 'gi' };

    conditions._approved = true;

    return conditions;
};

exports.parseProjection = (query) => {
    if (query.fields) return '_slug ' + query.fields.split(',').join(' ');
};

exports.parseSort = (query) => {
    if (query.sort) {
        const sort = _.intersection(allowedSort, query.sort.split(','));
        return sort.join(' ')
            .replace('newest',     '-_createdAt')
            .replace('oldest',     '_createdAt')
            .replace('lastUpdate', '_updatedAt')
            .replace('views',      '_views')
            .replace('readTime',   '_estimatedReadTime');
    }
};

exports.estimateReadTime = (numberOfWords) => {
    return Math.ceil(numberOfWords / 200); // 200 words per minute
};
