import MemcachedAdapterTestFactory = require('./MemcachedAdapterTestFactory');
import TaggedCache                 = require('../src/TaggedCache');


class TaggedCacheFactory {
    private static _cache:TaggedCache;

    public static create():TaggedCache {
        if(TaggedCacheFactory._cache == null) {
            let memcached = MemcachedAdapterTestFactory.create();
            TaggedCacheFactory._cache = new TaggedCache(memcached);
        }

        return TaggedCacheFactory._cache;
    }
}

export = TaggedCacheFactory;