const Redis = require('../configs/db/redis');

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
