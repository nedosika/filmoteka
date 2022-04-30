export const makeCaching = (f) => {
  const keys = new Map();
  const cache = new WeakMap();

  return (...args) => {
    const key = JSON.stringify(args);
    if (!keys.has(key)) {
      const newObjKey = { result: f(...args) };
      keys.set(key, newObjKey);
      cache.set(newObjKey, newObjKey.result);
    }

    return cache.get(keys.get(key));
  };
};
