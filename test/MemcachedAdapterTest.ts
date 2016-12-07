import MemcachedAdapterTestFactory = require('./MemcachedAdapterTestFactory');

import chai = require('chai');
let assert = chai.assert;


describe('MemcachedAdapter', () => {
    describe('#store and #retrieve', () => {
        it('returns value when exists', (done) => {
            let obj = {'val1':1, 'val2':'two'};

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

        it('returns null when not exists', (done) => {
            assert.fail(null, null, 'not implemented');
            done();
        });
    });
});