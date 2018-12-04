exports.sortKeys = obj => Object.keys(obj)
  .sort()
  .reduce((o, k) => ({ ...o, [k]: obj[k] }), {});
