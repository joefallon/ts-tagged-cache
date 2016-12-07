export interface ICacheable {
    store(key:string, data:any, cb:(err:Error)=>void);
    retrieve(key:string, cb:(err:Error, data:any)=>void);
    remove(key:string, cb:(err:Error)=>void);
    removeAll(cb:(err:Error)=>void);
}