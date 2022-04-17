const keyToStr = (key) => (typeof key === 'object' ? JSON.stringify(key) : key);

export const makeCaching = (f) => {
  const cache = {};

  return function () {
    const key = keyToStr(arguments[0]) + ',' + keyToStr(arguments[1]) + ',' + keyToStr(arguments[2]);
    if (!(key in cache)) {
      cache[key] = f(...arguments);
    }
    return cache[key];
  };
};
