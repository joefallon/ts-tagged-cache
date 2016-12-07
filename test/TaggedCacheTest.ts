import TaggedCacheFactory = require('./TaggedCacheFactory');

import chai = require('chai');
let assert  = chai.assert;


describe('TaggedCache', () => {
    it('test #removeAll for no cache entries', (done) => {
        let cache = TaggedCacheFactory.create();
        cache.removeAll(verifyNoError);

        function verifyNoError(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                done();
            }
        }
    });

    it('test #removeByTag for nonexistent tag', (done) => {
        let tag = 'nonexistent-tag';
        let cache = TaggedCacheFactory.create();
        cache.removeByTag(tag, verifyNoError);

        function verifyNoError(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                done();
            }
        }
    });

    it('test #retrieve returns null on missing cache entry', (done) => {
        let cache = TaggedCacheFactory.create();
        cache.retrieve('test-nonexistent-key', verifyNull);

        function verifyNull(err:Error, data:any) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                assert.isNull(data);
                done();
            }
        }
    });

    it('test #removeAll', (done) => {
        assert.fail(null, null, 'not implemented');
        done();
    });

    it('test #removeByTag removes tagged items', (done) => {
        assert.fail(null, null, 'not implemented');
        done();
    });

    it('test #removeByTag does not remove untagged items', (done) => {
        assert.fail(null, null, 'not implemented');
        done();
    });

    it('test #remove deletes cached value', (done) => {
        assert.fail(null, null, 'not implemented');
        done();
    });

    it('test #store and #retrieve with no tags', (done) => {
        let obj   = {'val1':1, 'val2':'two'};
        let cache = TaggedCacheFactory.create();
        cache.store('tagged-cache-store', obj, null, retrieveValue);

        function retrieveValue(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                cache.retrieve('tagged-cache-store', verifyData);
            }
        }

        function verifyData(err:Error, data:any) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                assert.strictEqual(data['val1'], 1);
                assert.strictEqual(data['val2'], 'two');
                done();
            }
        }
    });

    it('test #store and #retrieve with tag', (done) => {
        assert.fail(null, null, 'not implemented');
        done();
    });
});