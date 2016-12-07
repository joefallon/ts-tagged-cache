"use strict";
var _ = require('lodash');
var TaggedCache = (function () {
    function TaggedCache(cache) {
        this._cache = cache;
    }
    TaggedCache.prototype.store = function (key, value, tags, cb) {
        if (tags === void 0) { tags = []; }
        if (tags == null) {
            tags = [];
        }
        var self = this;
        var cache = this._cache;
        cache.remove(key, storeNewKey);
        function storeNewKey(err) {
            if (err) {
                cb(err);
            }
            else {
                var cacheEntry = {
                    'tags': tags,
                    'value': value
                };
                cache.store(key, value, updateTags);
            }
        }
        function updateTags(err) {
            if (err) {
                cb(err);
            }
            else {
                for (var i = 0; i < tags.length; i++) {
                    self.addKeyToTag(key, tags[i], addKeyToAllKeysTag);
                }
                if (tags.length == 0) {
                    addKeyToAllKeysTag(null);
                }
            }
        }
        var currentTagCount = 0;
        function addKeyToAllKeysTag(err) {
            if (err) {
                cb(err);
            }
            else {
                currentTagCount++;
                if (currentTagCount == tags.length || tags.length == 0) {
                    self.addKeyToTag(key, TaggedCache.ALL_KEYS_TAG, cb);
                }
            }
        }
    };
    TaggedCache.prototype.remove = function (key, cb) {
        // this.removeKeyFromTagCacheEntries(key);
    };
    TaggedCache.prototype.retrieve = function (key, cb) {
        this._cache.retrieve(key, returnValue);
        function returnValue(err, data) {
            if (err) {
                cb(err, null);
            }
            else if (data == null) {
                cb(null, null);
            }
            else {
                cb(null, data['value']);
            }
        }
    };
    TaggedCache.prototype.removeByTag = function (tag, cb) {
        setImmediate(function () { cb(null); });
    };
    TaggedCache.prototype.removeAll = function (cb) {
        this._cache.removeAll(cb);
    };
    TaggedCache.prototype.addKeyToTag = function (key, tag, cb) {
        var self = this;
        var cacheTag = TaggedCache.createNamespacedKey(tag);
        this._cache.retrieve(cacheTag, storeTags);
        function storeTags(err, data) {
            if (err) {
                cb(err);
            }
            else {
                if (data == null) {
                    data = [];
                }
                data.push(key);
                data = _.uniq(data);
                self._cache.store(cacheTag, data, cb);
            }
        }
    };
    TaggedCache.createNamespacedKey = function (tag) {
        return TaggedCache.NAMESPACE + ':' + tag;
    };
    TaggedCache.NAMESPACE = 'tagged-cache';
    TaggedCache.ALL_KEYS_TAG = 'tagged-cache-all-keys-tag';
    return TaggedCache;
}());
module.exports = TaggedCache;
