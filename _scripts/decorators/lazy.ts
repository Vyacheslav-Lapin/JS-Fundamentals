export default function lazy<T>(factory: () => T,
                                writable = false,
                                configurable = false,
                                enumerable = false): (o: any, s: string | symbol) => any {

    return (o, propertyKey): TypedPropertyDescriptor<T> => ({
        configurable: true,
        enumerable,
        get() {
            const value = factory();
            Object.defineProperty(o, propertyKey, {value, configurable, writable});
            return value;
        },
    });
}
