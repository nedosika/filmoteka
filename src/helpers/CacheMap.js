export default class CacheMap {
  constructor(Fn) {
    this.cachedFn = Fn;
    this.keys = new Map();
    this.cache = new WeakMap();
  }

  get(...args) {
    const key = JSON.stringify(args);

    if (!this.keys.has(key)) {
      const newObjKey = { result: this.cachedFn(...args) };

      this.keys.set(key, newObjKey);
      this.cache.set(newObjKey, newObjKey.result);
    }

    return this.cache.get(this.keys.get(key));
  }

  has(...args) {
    const key = JSON.stringify(args);
    return this.keys.has(key);
  }

  set(...args) {
    const key = JSON.stringify(args);
    const newObjKey = { result: this.cachedFn(...args) };
    this.keys.set(key, newObjKey);
    this.cache.set(newObjKey, newObjKey.result);
  }

  delete(...args) {
    const key = JSON.stringify(args);
    this.keys.delete(key);
  }

  clear() {
    this.keys.clear();
  }
}
