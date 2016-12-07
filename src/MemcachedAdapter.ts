///<reference path="memcached.d.ts"/>
import Memcached = require('memcached');

import {ICacheable} from './ICacheable';


class MemcachedAdapter implements ICacheable {
    private _cached:Memcached;

    constructor(ipAddress:string, port:string) {
        this._cached = new Memcached(`${ipAddress}:${port}`);
    }

    public store(key:string, data:any, cb:(err:Error)=>void):any {
        this._cached.set(key, data, cb);
    }

    public retrieve(key:string, cb:(err:Error, data:any)=>void):any {
        this._cached.get(key, cb);
    }

    public remove(key:string, cb:(err:Error)=>void):any {
        this._cached.del(key, cb);
    }

    public removeAll(cb:(err:Error)=>void):any {
        this._cached.flush(cb);
    }
}

export = MemcachedAdapter;