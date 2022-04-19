export const makeCaching = (f) => {
  const cache = new WeakMap();

  return (args) => {
    if (!cache.has(args)) {
      cache.set(args, f(args));
    }

    return cache.get(args);
  };
};
