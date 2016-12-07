"use strict";
var MemcachedAdapterTestFactory = require('./MemcachedAdapterTestFactory');
var chai = require('chai');
var assert = chai.assert;
describe('MemcachedAdapter', function () {
    it('test #store and #retrieve with value', function (done) {
        var obj = { 'val1': 1, 'val2': 'two' };
        var cache = MemcachedAdapterTestFactory.create();
        cache.store('test_store_and_retrieve', obj, retrieveValue);
        function retrieveValue(err) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                cache.retrieve('test_store_and_retrieve', verifyData);
            }
        }
        function verifyData(err, data) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                assert.strictEqual(data['val1'], 1);
                assert.strictEqual(data['val2'], 'two');
                done();
            }
        }
    });
    it('test #store and #retrieve returns null when not exists', function (done) {
        var cache = MemcachedAdapterTestFactory.create();
        cache.retrieve('test_nonexistent_key', verifyNull);
        function verifyNull(err, data) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                assert.isNull(data);
                done();
            }
        }
    });
    it('test #remove deletes the given key', function (done) {
        var obj = 'test value';
        var cache = MemcachedAdapterTestFactory.create();
        cache.store('test_remove_value', obj, removeValue);
        function removeValue(err) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                cache.remove('test_remove_value', verifyValueRemoved);
            }
        }
        function verifyValueRemoved(err) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                cache.retrieve('test_remove_value', verifyIsNull);
            }
        }
        function verifyIsNull(err, data) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                assert.isNull(data);
                done();
            }
        }
    });
    it('test #removeAll deletes all keys', function (done) {
        var key1 = 'removeAllKey1';
        var key2 = 'removeAllKey2';
        var data1 = 'data1';
        var data2 = 'data2';
        var finishedCount = 2;
        var cache = MemcachedAdapterTestFactory.create();
        cache.store(key1, data1, removeAll);
        cache.store(key2, data2, removeAll);
        var storedCount = 0;
        function removeAll(err) {
            if (err) {
                assert.fail(null, null, err.message);
            }
            else {
                storedCount++;
                if (storedCount == finishedCount) {
                    cache.removeAll(retrieveDeletedKeys);
                }
            }
        }
        var removedCount = 0;
        function retrieveDeletedKeys(err) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                cache.retrieve(key1, verifyIsNull);
                cache.retrieve(key2, verifyIsNull);
            }
        }
        var isNullCount = 0;
        function verifyIsNull(err, data) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                isNullCount++;
                assert.isNull(data);
                if (isNullCount == finishedCount) {
                    done();
                }
            }
        }
    });
});
