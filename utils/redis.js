const { del, hmset, hlen } = require('../databases/redis');
const { sortKeys } = require('./object');

exports.saveHash = (source, dest) => {
    return new Promise(async (resolve, reject) => {
        try {
            await del(dest);
            await hmset(dest, source);
            const num = await hlen(dest);
            resolve(num);
        } catch (err) {
            reject(err);
        }
    });
};

exports.createKey = (query) => {
    return 'posts:' + JSON.stringify(sortKeys(query));
};
