import MemcachedAdapter = require('../src/MemcachedAdapter');


class MemcachedAdapterTestFactory {
    private static _cache:MemcachedAdapter;

    public static create():MemcachedAdapter {
        if(MemcachedAdapterTestFactory._cache == null) {
            MemcachedAdapterTestFactory._cache = new MemcachedAdapter('127.0.0.1', '11211');
        }

        return MemcachedAdapterTestFactory._cache;
    }
}

export = MemcachedAdapterTestFactory;