import YTTime from "./YTTime";

export default class YTLink {

    // noinspection ReservedWordAsName
    public static parse<Y extends YTLink>(this: new (s: string, t: YTTime) => Y, youTubeUrl: string): Y {
        const endOfId = youTubeUrl.indexOf("?");
        return new this(
            youTubeUrl.substring(17, endOfId),
            YTTime.parse(youTubeUrl.substring(endOfId + 3)));
    }

    constructor(protected id: string, protected startTime: YTTime) {
    }

    /**
     * @override
     */
    public toString(): string {
        return `https://youtu.be/${this.id}?t=${this.startTime}`;
    }
}
