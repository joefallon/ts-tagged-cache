"use strict";
var MemcachedAdapter = require('../src/MemcachedAdapter');
var MemcachedAdapterTestFactory = (function () {
    function MemcachedAdapterTestFactory() {
    }
    MemcachedAdapterTestFactory.create = function () {
        if (MemcachedAdapterTestFactory._cache == null) {
            MemcachedAdapterTestFactory._cache = new MemcachedAdapter('127.0.0.1', '11211');
        }
        return MemcachedAdapterTestFactory._cache;
    };
    return MemcachedAdapterTestFactory;
}());
module.exports = MemcachedAdapterTestFactory;
