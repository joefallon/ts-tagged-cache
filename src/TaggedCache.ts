import _ = require('lodash');

import {ICacheable} from './ICacheable';

class TaggedCache {
    private _cache:ICacheable;
    private static NAMESPACE    = 'tagged-cache';
    private static ALL_KEYS_TAG = 'tagged-cache-all-keys-tag';


    constructor(cache:ICacheable) {
        this._cache = cache;
    }

    public store(key:string, value:any, tags:string[] = [], cb:(err:Error)=>void) {
        if(tags == null) {
            tags = [];
        }

        let self  = this;
        let cache = this._cache;
        cache.remove(key, storeNewKey);

        function storeNewKey(err:Error) {
            if(err) {
                cb(err);
            } else {
                let cacheEntry = {
                    'tags':  tags,
                    'value': value
                };

                cache.store(key, value, updateTags);
            }
        }

        function updateTags(err:Error) {
            if(err) {
                cb(err);
            } else {
                for(let i = 0; i < tags.length; i++) {
                    self.addKeyToTag(key, tags[i], addKeyToAllKeysTag);
                }

                if(tags.length == 0) {
                    addKeyToAllKeysTag(null);
                }
            }
        }

        let currentTagCount = 0;

        function addKeyToAllKeysTag(err:Error) {
            if(err) {
                cb(err);
            } else {
                currentTagCount++;

                if(currentTagCount == tags.length || tags.length == 0) {
                    self.addKeyToTag(key, TaggedCache.ALL_KEYS_TAG, cb);
                }
            }
        }
    }

    public remove(key:string, cb:(err:Error)=>void) {
        // this.removeKeyFromTagCacheEntries(key);
    }

    public retrieve(key:string, cb:(err:Error, data:any)=>void):any {
        this._cache.retrieve(key, returnValue);

        function returnValue(err:Error, data:any) {
            if(err) {
                cb(err, null);
            } else if(data == null) {
                cb(null, null);
            } else {
                cb(null, data['value']);
            }
        }
    }

    public removeByTag(tag:string, cb:(err:Error)=>void) {
        setImmediate(() => { cb(null); });
    }

    public removeAll(cb:(err:Error)=>void) {
        this._cache.removeAll(cb);
    }

    private addKeyToTag(key:string, tag:string, cb:(err:Error)=>void) {
        let self = this;
        let cacheTag = TaggedCache.createNamespacedKey(tag);
        this._cache.retrieve(cacheTag, storeTags);

        function storeTags(err:Error, data:string[]) {
            if(err) {
                cb(err);
            } else {
                if(data == null) {
                    data = [];
                }

                data.push(key);
                data = _.uniq(data);
                self._cache.store(cacheTag, data, cb);
            }
        }
    }

    private static createNamespacedKey(tag:string):string {
        return TaggedCache.NAMESPACE + ':' + tag;
    }
}

export = TaggedCache;