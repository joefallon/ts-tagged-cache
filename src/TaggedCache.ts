class TaggedCache {
    private static readonly BASE_NAMESPACE = 'ts-tagged-cache';
    private static readonly ALL_KEYS_TAG   = 'ts-tagged-cache-all-keys';


    public store(key:string, value:any, tags:string[]) {

    }

    public remove(key:string) {

    }

    public retrieve(key:string):any {

    }

    public exists(key:string):boolean {
        return false;
    }

    public removeByTag(tag:string) {

    }

    public removeAll() {

    }
 }

export = TaggedCache;