module.exports = function (config) {
    config.set({
        frameworks: ["jasmine"],
        files: [
            { pattern: "_scripts/**/*.js" },
        ],
    });
};
