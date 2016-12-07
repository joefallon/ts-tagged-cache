"use strict";
var TaggedCache = (function () {
    function TaggedCache() {
    }
    TaggedCache.prototype.store = function (key, value, tags) {
    };
    TaggedCache.prototype.remove = function (key) {
    };
    TaggedCache.prototype.retrieve = function (key) {
    };
    TaggedCache.prototype.exists = function (key) {
        return false;
    };
    TaggedCache.prototype.removeByTag = function (tag) {
    };
    TaggedCache.prototype.removeAll = function () {
    };
    TaggedCache.BASE_NAMESPACE = 'ts-tagged-cache';
    TaggedCache.ALL_KEYS_TAG = 'ts-tagged-cache-all-keys';
    return TaggedCache;
}());
module.exports = TaggedCache;
