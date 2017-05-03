"use strict";

const YTTime = (SECONDS => class {
    /**
     * @private
     * @param {string|number} [hours=0]
     * @param {string|number} [minutes=0]
     * @param {string|number} [seconds=0]
     */
    constructor([seconds = 0, minutes = 0, hours = 0]) {
        seconds = parseInt(seconds) || 0;
        minutes = parseInt(minutes) || 0;
        hours = parseInt(hours) || 0;

        this[SECONDS] = seconds + 60 * (minutes + 60 * hours);
    }

    /**
     * @override
     * @returns {string}
     */
    toString() {
        const hours = Math.floor(this[SECONDS] / 3600);
        const minutes = Math.floor(this[SECONDS] % 3600 / 60);
        const seconds = this[SECONDS] % 60;
        return `${hours ? hours + 'h' : ''}${minutes ? minutes + 'm' : ''}${seconds ? seconds + 's' : ''}`;

    }

    /**
     * @returns {number}
     */
    toSeconds() {
        return this[SECONDS];
    }

    /**
     * @param {string} youTubeUrl
     * @returns {YTTime}
     */
    static parse(youTubeUrl) {
        return new this(this.regExp.exec(youTubeUrl).reverse());
    }

    /**
     * @param {string} time
     * @returns {YTTime}
     */
    static parseForm(time) {
        return new this(time.split(':').reverse());
    }

})(Symbol('seconds'));

Object.defineProperty(YTTime, 'regExp', {value: /([0-2]?\dh)?([0-5]?\dm)?([0-5]?\ds)?/i});

console.log(new YTTime([3, 2, 1]).toString() === '1h2m3s');
console.log(new YTTime([3, 2, NaN]).toString() === '2m3s');
console.log(new YTTime([3, 2, 1]).toSeconds() === ((60 + 2) * 60) + 3);

console.log(YTTime.parse('1h2m3s').toString() === '1h2m3s');
console.log(YTTime.parse('2m3s').toString() === '2m3s');
console.log(YTTime.parse('1h2m3s').toSeconds() === ((60 + 2) * 60) + 3);

console.log((YTTime.parseForm('1:2:3').toString() === '1h2m3s'));
console.log((YTTime.parseForm('2:3').toString() === '2m3s'));
console.log((YTTime.parseForm('3').toString() === '3s'));


const [YTLink, YTEmbedLink] = ((ID, START_TIME) => {

    class YTLink {
        /**
         * @param {string} id
         * @param {YTTime} yTTime
         */
        constructor(id, yTTime) {
            this[ID] = id;
            this[START_TIME] = yTTime;
        }

        /**
         * @override
         * @returns {string}
         */
        toString() {
            return `https://youtu.be/${this[ID]}?t=${this[START_TIME]}`;
        }

        /**
         * @param {string} youTubeUrl
         * @returns {YTLink}
         */
        static parse(youTubeUrl) {
            const endOfId = youTubeUrl.indexOf('?');
            return new this(
                youTubeUrl.substring(17, endOfId),
                YTTime.parse(youTubeUrl.substring(endOfId + 3)));
        }
    }

    const YTEmbedLink = ((END_TIME, AUTO_PLAY) => class extends YTLink {
        /**
         * @param {string} id
         * @param {YTTime} startTime
         * @param {YTTime} endTime
         * @param {boolean} [autoPlay=true]
         */
        constructor(id, startTime, endTime, autoPlay = true) {
            super(id, startTime);
            this[END_TIME] = endTime;
            this[AUTO_PLAY] = autoPlay;
        }

        /**
         * @override
         * @returns {string}
         */
        toString() {
            const start = this[START_TIME].toSeconds();
            const end = this[END_TIME].toSeconds();
            const autoPlay = this[AUTO_PLAY] ? 1: 0;
            return `https://www.youtube.com/embed/${this[ID]}?start=${start}&end=${end}&autoplay=${autoPlay}`;
        }

        /**
         * @param {string} youTubeUrl
         * @param {string} endTime
         * @returns {YTEmbedLink}
         */
        static parseForm(youTubeUrl, endTime) {
            return Object.assign(
                this.parse(youTubeUrl),
                {[END_TIME]: YTTime.parseForm(endTime)});
        }
    })(Symbol('endTime'), Symbol('autoPlay'));

    return [YTLink, YTEmbedLink];

})(Symbol('id'), Symbol('startTime'));

console.log(new YTLink('khafgfdagrr', YTTime.parse('1h2m3s')).toString() ===
    'https://youtu.be/khafgfdagrr?t=1h2m3s');

console.log(YTLink.parse('https://youtu.be/k0jC50TcdR0?t=1h5m2s').toString() ===
    'https://youtu.be/k0jC50TcdR0?t=1h5m2s');

console.log(new YTEmbedLink('dfsfsf', new YTTime([3, 2, 1]), new YTTime([4, 2, 1])).toString()
    === 'https://www.youtube.com/embed/dfsfsf?start=3723&end=3724&autoplay=1');

console.log(new YTEmbedLink('khafgfdag', YTTime.parse('1h2m3s'), YTTime.parse('1h2m4s')).toString() ===
    'https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1');

console.log(YTEmbedLink.parseForm('https://youtu.be/khafgfdag?t=1h2m3s', '1:2:4').toString() ===
    'https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1');