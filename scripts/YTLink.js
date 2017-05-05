'use strict';

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

        /** @type number */ this[SECONDS] = seconds + 60 * (minutes + 60 * hours);
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


const [YTLink, YTEmbedLink] = ((ID, START_TIME) => {

    class YTLink {
        /**
         * @param {string} id
         * @param {YTTime} startTime
         */
        constructor(id, startTime) {
            /** @type string */ this[ID] = id;
            /** @type YTTime */ this[START_TIME] = startTime;
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
            /** @type YTTime */ this[END_TIME] = endTime;
            /** @type boolean */ this[AUTO_PLAY] = autoPlay;
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