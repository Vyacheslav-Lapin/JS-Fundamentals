enum OsType { MacOS, Linux, iOS, Android, Windows, Unknown }

export default class OS {

    public static get title(): string {
        return this.os.toString();
    }

    public static get copyToBufferDefaultHotKeys() {
        return `${this.os.type === OsType.MacOS ? "Cmd" : "Ctrl"}+C`;
    }

    @lazy(() => new OS())
    private static os: OS;

    private type: OsType;

    public constructor() {
        const platform = navigator.platform;

        this.type =
            ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(platform) !== -1 ? OsType.MacOS :
                ["iPhone", "iPad", "iPod"].indexOf(platform) !== -1 ? OsType.iOS :
                    ["Win32", "Win64", "Windows", "WinCE"].indexOf(platform) !== -1 ? OsType.Windows :
                        /Android/.test(navigator.userAgent) ? OsType.Android :
                            /Linux/.test(platform) ? OsType.Linux :
                                OsType.Unknown;
    }

    /** @override */
    public toString() {
        return OsType[this.type];
    }
}

function lazy<T>(factory: () => T, writable = false) {
    return (o: any, propertyKey: string | symbol) => Object.defineProperty(o, propertyKey, {
        configurable: true,
        get() {
            return Object.defineProperty(o, propertyKey, {
                writable,
                value: factory(),
            })[propertyKey];
        },
    });
}
