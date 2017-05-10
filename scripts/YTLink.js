class YTTime {
    constructor([secondsString = "", minutesString = "", hoursString = ""]) {
        const seconds = parseInt(secondsString) || 0;
        const minutes = parseInt(minutesString) || 0;
        const hours = parseInt(hoursString) || 0;
        this.seconds = seconds + 60 * (minutes + 60 * hours);
    }
    /** @override */
    toString() {
        const hours = Math.floor(this.seconds / 3600);
        const minutes = Math.floor(this.seconds % 3600 / 60);
        const seconds = this.seconds % 60;
        return `${hours ? hours + 'h' : ''}${minutes ? minutes + 'm' : ''}${seconds ? seconds + 's' : ''}`;
    }
    toSeconds() {
        return this.seconds;
    }
    static parse(youTubeUrl) {
        return new this(this.regExp.exec(youTubeUrl).reverse());
    }
    static parseForm(time) {
        return new this(time.split(':').reverse());
    }
}
YTTime.regExp = /([0-2]?\dh)?([0-5]?\dm)?([0-5]?\ds)?/i;
class YTLink {
    constructor(id, startTime) {
        this.id = id;
        this.startTime = startTime;
    }
    /**
     * @override
     */
    toString() {
        return `https://youtu.be/${this.id}?t=${this.startTime}`;
    }
    static parse(youTubeUrl) {
        const endOfId = youTubeUrl.indexOf('?');
        return new this(youTubeUrl.substring(17, endOfId), YTTime.parse(youTubeUrl.substring(endOfId + 3)));
    }
}
class YTEmbedLink extends YTLink {
    constructor(id, startTime, endTime, autoPlay = true) {
        super(id, startTime);
        this.endTime = endTime;
        this.autoPlay = autoPlay;
    }
    /** @override */
    toString() {
        const start = this.startTime.toSeconds();
        const end = this.endTime.toSeconds();
        const autoPlay = this.autoPlay ? 1 : 0;
        return `https://www.youtube.com/embed/${this.id}?start=${start}&end=${end}&autoplay=${autoPlay}`;
    }
    static parseForm(youTubeUrl, endTime) {
        return Object.assign(this.parse(youTubeUrl), { endTime: YTTime.parseForm(endTime) });
    }
}
