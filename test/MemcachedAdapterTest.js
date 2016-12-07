"use strict";
var MemcachedAdapterTestFactory = require('./MemcachedAdapterTestFactory');
var chai = require('chai');
var assert = chai.assert;
describe('MemcachedAdapter', function () {
    describe('#store and #retrieve', function () {
        it('returns value when exists', function (done) {
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
        it('returns null when not exists', function (done) {
            assert.fail(null, null, 'not implemented');
            done();
        });
    });
});
