const { sortKeys } = require('./object');

exports.createKey = (query) => {
    return 'posts:' + JSON.stringify(sortKeys(query));
};
