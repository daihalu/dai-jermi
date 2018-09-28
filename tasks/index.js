const syncSlugs = require('./sync-slugs');

module.exports = function repeat() {
    syncSlugs();
    setTimeout(repeat, 60 * 60 * 1000);
};
