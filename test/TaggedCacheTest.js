"use strict";
var TaggedCacheFactory = require('./TaggedCacheFactory');
var chai = require('chai');
var assert = chai.assert;
describe('TaggedCache', function () {
    it('test #removeAll for no cache entries', function (done) {
        var cache = TaggedCacheFactory.create();
        cache.removeAll(verifyNoError);
        function verifyNoError(err) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                done();
            }
        }
    });
    it('test #removeByTag for nonexistent tag', function (done) {
        var tag = 'nonexistent-tag';
        var cache = TaggedCacheFactory.create();
        cache.removeByTag(tag, verifyNoError);
        function verifyNoError(err) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                done();
            }
        }
    });
    it('test #retrieve returns null on missing cache entry', function (done) {
        var cache = TaggedCacheFactory.create();
        cache.retrieve('test-nonexistent-key', verifyNull);
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
    it('test #removeAll', function (done) {
        assert.fail(null, null, 'not implemented');
        done();
    });
    it('test #removeByTag removes tagged items', function (done) {
        assert.fail(null, null, 'not implemented');
        done();
    });
    it('test #removeByTag does not remove untagged items', function (done) {
        assert.fail(null, null, 'not implemented');
        done();
    });
    it('test #remove deletes cached value', function (done) {
        assert.fail(null, null, 'not implemented');
        done();
    });
    it('test #store and #retrieve with no tags', function (done) {
        var obj = { 'val1': 1, 'val2': 'two' };
        var cache = TaggedCacheFactory.create();
        cache.store('tagged-cache-store', obj, null, retrieveValue);
        function retrieveValue(err) {
            if (err) {
                assert.fail(null, null, err.message);
                done();
            }
            else {
                cache.retrieve('tagged-cache-store', verifyData);
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
    it('test #store and #retrieve with tag', function (done) {
        assert.fail(null, null, 'not implemented');
        done();
    });
});
