"use strict";

const YTTime = ((HOURS, MINUTES, SECONDS) => class {
    /**
     * @param {number} [hours=0]
     * @param {number} [minutes=0]
     * @param {number} [seconds=0]
     */
    constructor(hours = 0, minutes = 0, seconds = 0) {
        this[HOURS] = hours;
        this[MINUTES] = minutes;
        this[SECONDS] = seconds;
    }

    /**
     * @override
     * @returns {string}
     */
    toString() {
        const hours = this[HOURS] ? this[HOURS] + 'h' : '';
        const minutes = this[MINUTES] ? this[MINUTES] + 'm' : '';
        const seconds = this[SECONDS] ? this[SECONDS] + 's' : '';
        return hours + minutes + seconds;
    }

    /**
     * @returns {number}
     */
    toSeconds() {
        return (this[HOURS] * 60 + this[MINUTES]) * 60 + this[SECONDS];
    }

    /**
     * @param {string} youTubeUrl
     */
    static parse(youTubeUrl) {
        const [, hours, minutes, seconds] = this.regExp.exec(youTubeUrl);
        return new this(parseInt(hours), parseInt(minutes), parseInt(seconds));
    }

    /**
     * @param {string} time
     */
    static parseForm(time) {
        const [seconds = '', minutes = '', hours = ''] = time.split(':').reverse();
        return new this(parseInt(hours), parseInt(minutes), parseInt(seconds));
    }
})(Symbol('hours'), Symbol('minutes'), Symbol('seconds'));

Object.defineProperty(YTTime, 'regExp', {value: /([0-2]?\dh)?([0-5]?\dm)?([0-5]?\ds)?/i});

console.log(new YTTime(1, 2, 3).toString() === '1h2m3s');
console.log(new YTTime(1, 2, 3).toSeconds() === 3723);
console.log((YTTime.parse('1h2m3s').toString() === '1h2m3s'));
console.log((YTTime.parseForm('1:2:3').toString() === '1h2m3s'));
console.log((YTTime.parseForm('2:3').toString() === '2m3s'));
console.log((YTTime.parseForm('3').toString() === '3s'));

const [YTLink, YTEmbedLink] = ((ID, START_TIME, END_TIME, AUTO_PLAY) => {

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
         */
        static parse(youTubeUrl) {
            const endOfId = youTubeUrl.indexOf('?');
            return new this(
                youTubeUrl.substring(17, endOfId),
                YTTime.parse(youTubeUrl.substring(endOfId + 3)));
        }
    }

    class YTEmbedLink extends YTLink {
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
            return `https://www.youtube.com/embed/${this[ID]}?start=${this[START_TIME].toSeconds()}&end=${this[END_TIME].toSeconds()}&autoplay=${this[AUTO_PLAY] ? 1: 0}`;
        }

        /**
         * @param {string} youTubeUrl
         * @param {string} endTime
         * @returns {YTEmbedLink}
         */
        static parseForm({youTubeUrl: {value: youTubeUrl}, endTime: {value: endTime}}) {

            return Object.assign(this.parse(youTubeUrl), {
                [END_TIME]: YTTime.parseForm(endTime)
            });

            //noinspection JSValidateTypes
            // return Object.defineProperty(this.parse(youTubeUrl), END_TIME, { value: YTTime.parseForm(endTime)});
        }
    }

    return [YTLink, YTEmbedLink];

})(Symbol('id'), Symbol('startTime'), Symbol('endTime'), Symbol('autoPlay'));

console.log(new YTLink('khafgfdagrr', YTTime.parse('1h2m3s')).toString() ===
    'https://youtu.be/khafgfdagrr?t=1h2m3s');

console.log(YTLink.parse('https://youtu.be/k0jC50TcdR0?t=1h5m2s').toString() ===
    'https://youtu.be/k0jC50TcdR0?t=1h5m2s');

console.log(new YTEmbedLink('khafgfdag', YTTime.parse('1h2m3s'), YTTime.parse('1h2m4s')).toString() ===
    'https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1');

console.log(YTEmbedLink.parseForm({
        youTubeUrl: {value: 'https://youtu.be/khafgfdag?t=1h2m3s'},
        endTime: {value: '1:2:4'}
    }).toString() === 'https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1');