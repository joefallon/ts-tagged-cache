import { ICacheable } from './ICacheable';
declare class TaggedCache {
    private _cache;
    private static NAMESPACE;
    private static ALL_KEYS_TAG;
    constructor(cache: ICacheable);
    store(key: string, value: any, tags: string[], cb: (err: Error) => void): void;
    remove(key: string, cb: (err: Error) => void): void;
    retrieve(key: string, cb: (err: Error, data: any) => void): any;
    removeByTag(tag: string, cb: (err: Error) => void): void;
    removeAll(cb: (err: Error) => void): void;
    private addKeyToTag(key, tag, cb);
    private static createNamespacedKey(tag);
}
export = TaggedCache;
