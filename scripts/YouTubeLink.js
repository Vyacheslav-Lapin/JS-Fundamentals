'use strict';

const YouTubeTime = ((HOURS, MINUTES, SECONDS) => class {
    constructor(hours = 0, minutes = 0, seconds = 0) {
        this[HOURS] = hours;
        this[MINUTES] = minutes;
        this[SECONDS] = seconds;
    }

    toString() {
        return this.toHumanReadable();
    }

    toHumanReadable() {
        const hours = this[HOURS] ? this[HOURS] + 'h' : '';
        const minutes = this[MINUTES] ? this[MINUTES] + 'm' : '';
        const seconds = this[SECONDS] ? this[SECONDS] + 's' : '';
        return `${hours}${minutes}${seconds}`;
    }

    toSeconds() {
        return this[HOURS] * 3600 + this[MINUTES] * 60 + this[SECONDS];
    }

    /**
     * @param {string} time in (\d:)?(\d+:)?[0-5]\d format
     * @returns {*}
     */
    static parse(time) {
        const [seconds = '0', minutes = '0', hours = '0'] = time.split(':').reverse();
        return new this(parseInt(hours), parseInt(minutes), parseInt(seconds));
    }

    /**
     * @param {string} short in ([0-2]\d+h)?([0-5]?\d+m)?([0-5]?\d+s)? format
     */
    static parseHumanReadable(short) {
        const [seconds = '0', minutes = '0', hours = '0'] = this.regExp.exec(short).reverse();
        return new this(parseInt(hours), parseInt(minutes), parseInt(seconds));
    }
})(Symbol('hours'), Symbol('minutes'), Symbol('seconds'));

Object.defineProperty(YouTubeTime, 'regExp', {value: /([0-2]?\dh)?([0-5]?\dm)?([0-5]?\ds)?/i});

// console.log(new YouTubeTime(1, 2, 3).toString() === '1h2m3s');
// console.log(new YouTubeTime(NaN, 2, 3).toString() === '2m3s');
// console.log(new YouTubeTime(1, 2, 3).toSeconds() === 3723);
//
// console.log(YouTubeTime.parse("1:2:3").toString() === '1h2m3s');
// console.log(YouTubeTime.parse("2:3").toString() === '2m3s');
// console.log(YouTubeTime.parse("1:2:3").toSeconds() === 3723);
//
// console.log(YouTubeTime.parseHumanReadable('1h2m3s').toString() === '1h2m3s');
// console.log(YouTubeTime.parseHumanReadable('2m3s').toString() === '2m3s');
// console.log(YouTubeTime.parseHumanReadable('1h2m3s').toSeconds() === 3723);


const [YouTubeLink, YouTubeEmbedLink] = ((ID, START_TIME, END_TIME, AUTO_PLAY) => {

    class YouTubeLink {

        /**
         * @param {string} id
         * @param {YouTubeTime} startTime
         */
        constructor(id, startTime) {
            /** @type string */ this[ID] = id;
            /** @type YouTubeTime */ this[START_TIME] = startTime;
        }

        /**
         * @override
         * @returns {string}
         */
        toString() {
            return `https://youtu.be/${this[ID]}?t=${this[START_TIME]}`;
        }

        /**
         * @param {string} shortLink
         */
        static parseShort(shortLink) {
            const [, id, , start] = /^https:\/\/youtu\.be\/([\w\d-_]+)(\?t=(([0-2]\d+h)?([0-5]?\d+m)?([0-5]?\d+s)?))?/i.exec(shortLink);
            return new this(id, YouTubeTime.parseHumanReadable(start));
        }
    }

    return [YouTubeLink, class extends YouTubeLink {

        /**
         * @param {string} id
         * @param {YouTubeTime} startTime
         * @param {YouTubeTime} endTime
         * @param {boolean} autoPlay
         */
        constructor(id, startTime, endTime, autoPlay = true) {
            super(id, startTime);
            /** @type YouTubeTime */ this[END_TIME] = endTime;
            /** @type boolean */ this[AUTO_PLAY] = autoPlay;
        }

        toString() {
            const start = this[START_TIME].toSeconds();
            const end = this[END_TIME].toSeconds();
            const autoPlay = this[AUTO_PLAY] ? 1 : 0;
            return `https://www.youtube.com/embed/${this[ID]}?start=${start}&end=${end}&autoplay=${autoPlay}`;
        }

        /**
         * @override
         * @param {string} shortLink
         * @param {string} endTime in (\d:)?(\d+:)?[0-5]\d format
         * @param {boolean} [isAutoPlay=true]
         * @returns {YouTubeEmbedLink}
         */
        static parseShort(shortLink, endTime, isAutoPlay = true) {
            return Object.defineProperties(
                super.parseShort(shortLink), {
                    [END_TIME]: {value: YouTubeTime.parse(endTime)},
                    [AUTO_PLAY]: {value: isAutoPlay}
                });
        }
    }];
})(Symbol('id'), Symbol('startTime'), Symbol('endTime'), Symbol('autoPlay'));

// console.log(new YouTubeEmbedLink('dfsfsf', new YouTubeTime(1, 2, 3), new YouTubeTime(1, 2, 4)).toString()
//     === 'https://www.youtube.com/embed/dfsfsf?start=3723&end=3724&autoplay=1');