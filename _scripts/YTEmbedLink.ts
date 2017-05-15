import YTLink from "./YTLink";
import YTTime from "./YTTime";

export default class YTEmbedLink extends YTLink {

    public static parseForm(youTubeUrl: string, endTime: string): YTEmbedLink {
        return Object.assign(
            this.parse(youTubeUrl),
            {endTime: YTTime.parseForm(endTime)});
    }

    constructor(id: string, startTime: YTTime, private endTime?: YTTime, private autoPlay = true) {
        super(id, startTime);
    }

    /** @override */
    public toString(): string {
        const start = this.startTime.toSeconds();
        const end = this.endTime.toSeconds();
        const autoPlay = this.autoPlay ? 1 : 0;

        // noinspection SpellCheckingInspection
        return `https://www.youtube.com/embed/${this.id}?start=${start}&end=${end}&autoplay=${autoPlay}`;
    }
}
