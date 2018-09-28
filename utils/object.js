exports.sortKeys = (obj) => {
    return Object.keys(obj)
        .sort()
        .reduce((o, k) => {
            return { ...o, [k]: obj[k] }
        }, {});
};
