"use strict";
var MemcachedAdapterTestFactory = require('./MemcachedAdapterTestFactory');
var TaggedCache = require('../src/TaggedCache');
var TaggedCacheFactory = (function () {
    function TaggedCacheFactory() {
    }
    TaggedCacheFactory.create = function () {
        if (TaggedCacheFactory._cache == null) {
            var memcached = MemcachedAdapterTestFactory.create();
            TaggedCacheFactory._cache = new TaggedCache(memcached);
        }
        return TaggedCacheFactory._cache;
    };
    return TaggedCacheFactory;
}());
module.exports = TaggedCacheFactory;
