class YTTime {
    private static readonly regExp = /([0-2]?\dh)?([0-5]?\dm)?([0-5]?\ds)?/i;

    seconds: number;

    private constructor([secondsString = "", minutesString = "", hoursString = ""]) {
        const seconds = parseInt(secondsString) || 0;
        const minutes = parseInt(minutesString) || 0;
        const hours = parseInt(hoursString) || 0;

        this.seconds = seconds + 60 * (minutes + 60 * hours);
    }

    /** @override */
    toString(): string {
        const hours = Math.floor(this.seconds / 3600);
        const minutes = Math.floor(this.seconds % 3600 / 60);
        const seconds = this.seconds % 60;
        return `${hours ? hours + 'h' : ''}${minutes ? minutes + 'm' : ''}${seconds ? seconds + 's' : ''}`;
    }

    toSeconds(): number {
        return this.seconds;
    }

    static parse(youTubeUrl: string): YTTime {
        return new this(this.regExp.exec(youTubeUrl).reverse());
    }

    static parseForm(time: string): YTTime {
        return new this(time.split(':').reverse());
    }

}

class YTLink {
    constructor(protected id: string, protected startTime: YTTime) {
    }

    /**
     * @override
     */
    toString(): string {
        return `https://youtu.be/${this.id}?t=${this.startTime}`;
    }

    static parse(youTubeUrl: string): YTLink {
        const endOfId = youTubeUrl.indexOf('?');
        return new this(
            youTubeUrl.substring(17, endOfId),
            YTTime.parse(youTubeUrl.substring(endOfId + 3)));
    }
}

class YTEmbedLink extends YTLink {
    constructor(id: string, startTime: YTTime, private endTime: YTTime, private autoPlay = true) {
        super(id, startTime);
    }

    /** @override */
    toString(): string {
        const start = this.startTime.toSeconds();
        const end = this.endTime.toSeconds();
        const autoPlay = this.autoPlay ? 1 : 0;
        return `https://www.youtube.com/embed/${this.id}?start=${start}&end=${end}&autoplay=${autoPlay}`;
    }

    static parseForm(youTubeUrl: string, endTime: string): YTEmbedLink {
        return Object.assign(
            this.parse(youTubeUrl),
            {endTime: YTTime.parseForm(endTime)});
    }
}