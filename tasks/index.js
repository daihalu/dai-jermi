const syncSlugs = require('./sync-slugs');

module.exports = () => {
  syncSlugs.start();
};
