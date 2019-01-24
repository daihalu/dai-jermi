const Redis = require('../configs/db/redis');
const { sortKeys } = require('./object');

exports.createKey = query => `posts:${JSON.stringify(sortKeys(query))}`;

exports.replaceHash = (source, dest) => new Promise(async (resolve, reject) => {
  try {
    await Redis.delAsync(dest);
    await Redis.hmsetAsync(dest, source);
    const num = await Redis.hlenAsync(dest);
    resolve(num);
  } catch (err) {
    reject(err);
  }
});
