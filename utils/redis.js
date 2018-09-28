const Redis = require('../databases/redis');
const { sortKeys } = require('./object');

exports.replaceHash = (source, dest) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Redis.del(dest);
            await Redis.hmset(dest, source);
            const num = await Redis.hlen(dest);
            resolve(num);
        } catch (err) {
            reject(err);
        }
    });
};

exports.createKey = (query) => {
    return 'posts:' + JSON.stringify(sortKeys(query));
};
