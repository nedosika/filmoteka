export const makeCaching = (f) => {
  const cache = new Map();

  return (...args) => {
    const key = typeof args === 'object' ? JSON.stringify(args) : args;

    if (!cache.has(key)) {
      cache.set(key, f(...args));
    }

    console.log(cache);
    return cache.get(key);
  };
};
