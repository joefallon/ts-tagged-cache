
declare class Memcached {

    constructor(ipAddressAndPort:string);

    /**
     * Get the value for the given key.
     *
     * @param key the name of the key
     * @param cb  the callback
     */
    get(key:string, cb:(err:Error, data:any)=>void);

    /**
     * Stores a new value in Memcached.
     *
     * @param key   the name of the key
     * @param data  either a buffer, JSON, number or string that you want to store
     * @param cb    the callback
     */
    set(key:string, data:any, cb:(err:Error)=>void);

    /**
     * Remove the key from memcached.
     *
     * @param key  the name of the key
     * @param cb   the callback
     */
    del(key:string, cb:(err:Error)=>void);

    /**
     * Flushes the memcached server
     *
     * @param cb  the callback
     */
    flush(cb:(err:Error)=>void);
}

declare module "memcached" {
    export = Memcached;
}