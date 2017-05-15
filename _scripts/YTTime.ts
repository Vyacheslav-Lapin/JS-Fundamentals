export default class YTTime {

    public static parse(youTubeUrl: string): YTTime {
        return new this(this.regExp.exec(youTubeUrl).reverse() as [string, string, string]);
    }

    public static parseForm(time: string): YTTime {
        return new this(time.split(":").reverse() as [string, string, string]);
    }

    private static readonly regExp = /([0-2]?\dh)?([0-5]?\dm)?([0-5]?\ds)?/i;

    private seconds: number;

    // noinspection JSUnusedLocalSymbols
    public constructor([secondsString = "", minutesString = "", hoursString = ""]) {
        const seconds = parseInt(secondsString) || 0;
        const minutes = parseInt(minutesString) || 0;
        const hours = parseInt(hoursString) || 0;

        this.seconds = seconds + 60 * (minutes + 60 * hours);
    }

    /** @override */
    public toString(): string {
        const hours = Math.floor(this.seconds / 3600);
        const minutes = Math.floor(this.seconds % 3600 / 60);
        const seconds = this.seconds % 60;
        return `${hours ? hours + "h" : ""}${minutes ? minutes + "m" : ""}${seconds ? seconds + "s" : ""}`;
    }

    public toSeconds(): number {
        return this.seconds;
    }
}
