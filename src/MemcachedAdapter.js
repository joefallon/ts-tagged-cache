"use strict";
///<reference path="memcached.d.ts"/>
var Memcached = require('memcached');
var MemcachedAdapter = (function () {
    function MemcachedAdapter(ipAddress, port) {
        this._cached = new Memcached(ipAddress + ":" + port);
    }
    MemcachedAdapter.prototype.store = function (key, data, cb) {
        this._cached.set(key, data, cb);
    };
    MemcachedAdapter.prototype.retrieve = function (key, cb) {
        this._cached.get(key, cb);
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
