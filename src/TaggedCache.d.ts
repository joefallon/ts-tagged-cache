declare class TaggedCache {
    private static readonly BASE_NAMESPACE;
    private static readonly ALL_KEYS_TAG;
    store(key: string, value: any, tags: string[]): void;
    remove(key: string): void;
    retrieve(key: string): any;
    exists(key: string): boolean;
    removeByTag(tag: string): void;
    removeAll(): void;
}
export = TaggedCache;
