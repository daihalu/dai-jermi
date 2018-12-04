const Redis = require('../config/db/redis');
const { sortKeys } = require('./object');

exports.createKey = query => `posts:${JSON.stringify(sortKeys(query))}`;

exports.replaceHash = (source, dest) => new Promise(async (resolve, reject) => {
  try {
    await Redis.del(dest);
    await Redis.hmset(dest, source);
    const num = await Redis.hlen(dest);
    resolve(num);
  } catch (err) {
    reject(err);
  }
});
