import MemcachedAdapter = require('../src/MemcachedAdapter');
declare class MemcachedAdapterTestFactory {
    private static _cache;
    static create(): MemcachedAdapter;
}
export = MemcachedAdapterTestFactory;
