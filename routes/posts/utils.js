const _ = require('lodash');

exports.removeFalsey = (obj) => {
    return _.pickBy(obj, _.identity);
};

exports.createFindConditions = (query) => {
    const conditions = {};
    if (query.author) conditions.author = query.author;
    if (query.tag) conditions.tags = query.tag;
    if (query._updatedDate) {
        const timestamp = Date.parse(query._updatedDate);
        if (!Number.isNaN(timestamp)) {
            const date = new Date(timestamp);
            const nextDate = new Date(timestamp + 86400000);
            conditions._updatedDate = { $gte: date, $lt: nextDate };
        }
    }
    conditions._approved = query._approved;
    return conditions;
};

exports.createFindProjection = (query) => {
    const projection = {};
    const fields = query.fields ? query.fields.split(',') : [];
    fields.forEach(field => projection[field] = 1);
    return projection;
};

exports.createSortConditions = (query) => {
    const conditions = {};
    const sorts = query.sort ? query.sort.split(',') : [];
    sorts.forEach(sort => {
        if (sort.charAt(0) === '-') {
            conditions[sort.substring(1)] = -1;
        }
        else {
            conditions[sort] = 1;
        }
    });
    return conditions;
};

exports.estimateReadTime = (numberOfWords) => {
    return Math.ceil(numberOfWords / 200); // 200 words per minute
};