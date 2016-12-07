export interface ICacheable {
    store(key: string, data: any, cb: (err: Error) => void): any;
    retrieve(key: string, cb: (err: Error, data: any) => void): any;
    remove(key: string, cb: (err: Error) => void): any;
    removeAll(cb: (err: Error) => void): any;
}
