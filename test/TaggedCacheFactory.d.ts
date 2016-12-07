import TaggedCache = require('../src/TaggedCache');
declare class TaggedCacheFactory {
    private static _cache;
    static create(): TaggedCache;
}
export = TaggedCacheFactory;
