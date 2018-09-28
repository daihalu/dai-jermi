const syncSlugs = require('./sync-slugs');

module.exports = function repeat() {
    syncSlugs();
    setTimeout(repeat, 24 * 60 * 60 * 1000);
};
