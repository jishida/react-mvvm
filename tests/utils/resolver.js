module.exports = (path, options) => {
  const resolvedPath = options.defaultResolver(path, {
    ...options,
    pathFilter: (pkg) => {
      const ret = { ...pkg };
      if (path.startsWith('preact')) {
        Object.keys(pkg.exports).forEach((key) => {
          ret.exports[key].browser = pkg.exports[key].require;
        });
      }
      return ret;
    },
  });
  return resolvedPath;
};
