import MemcachedAdapterTestFactory = require('./MemcachedAdapterTestFactory');

import chai = require('chai');
let assert  = chai.assert;


describe('MemcachedAdapter', () => {
    it('test #store and #retrieve with value', (done) => {
        let obj   = {'val1':1, 'val2':'two'};
        let cache = MemcachedAdapterTestFactory.create();
        cache.store('test_store_and_retrieve', obj, retrieveValue);

        function retrieveValue(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                cache.retrieve('test_store_and_retrieve', verifyData);
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

    it('test #store and #retrieve returns null when not exists', (done) => {
        let cache = MemcachedAdapterTestFactory.create();
        cache.retrieve('test_nonexistent_key', verifyNull);

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

    it('test #remove deletes the given key', (done) => {
        let obj = 'test value';
        let cache = MemcachedAdapterTestFactory.create();
        cache.store('test_remove_value', obj, removeValue);

        function removeValue(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                cache.remove('test_remove_value', verifyValueRemoved);
            }
        }

        function verifyValueRemoved(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                cache.retrieve('test_remove_value', verifyIsNull);
            }
        }

        function verifyIsNull(err:Error, data:any) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                assert.isNull(data);
                done();
            }
        }
    });

    it('test #removeAll deletes all keys', (done) => {
        let key1  = 'removeAllKey1';
        let key2  = 'removeAllKey2';
        let data1 = 'data1';
        let data2 = 'data2';
        const finishedCount = 2;
        let cache = MemcachedAdapterTestFactory.create();
        cache.store(key1, data1, removeAll);
        cache.store(key2, data2, removeAll);

        let storedCount = 0;

        function removeAll(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
            } else {
                storedCount++;

                if(storedCount == finishedCount) {
                    cache.removeAll(retrieveDeletedKeys);
                }
            }
        }

        let removedCount = 0;

        function retrieveDeletedKeys(err:Error) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                cache.retrieve(key1, verifyIsNull);
                cache.retrieve(key2, verifyIsNull);
            }
        }

        let isNullCount = 0;

        function verifyIsNull(err:Error, data:any) {
            if(err) {
                assert.fail(null, null, err.message);
                done();
            } else {
                isNullCount++;
                assert.isNull(data);

                if(isNullCount == finishedCount) {
                    done();
                }
            }
        }
    });
});