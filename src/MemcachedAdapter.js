"use strict";
var Memcached = require('memcached');
var MemcachedAdapter = (function () {
    function MemcachedAdapter(ipAddress, port) {
        this._cached = new Memcached(ipAddress + ":" + port);
    }
    MemcachedAdapter.prototype.store = function (key, data, cb) {
        this._cached.set(key, data, 0, cb);
    };
    MemcachedAdapter.prototype.retrieve = function (key, cb) {
        this._cached.get(key, normalizeData);
        function normalizeData(err, data) {
            if (err) {
                cb(err, null);
            }
            else if (typeof data == 'undefined') {
                cb(null, null);
            }
            else {
                cb(null, data);
            }
        }
    };
    MemcachedAdapter.prototype.remove = function (key, cb) {
        this._cached.del(key, cb);
    };
    MemcachedAdapter.prototype.removeAll = function (cb) {
        this._cached.flush(cb);
    };
    return MemcachedAdapter;
}());
module.exports = MemcachedAdapter;
