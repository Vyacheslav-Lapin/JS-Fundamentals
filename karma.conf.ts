module.exports = config => {
    config.set({
        frameworks: ["jasmine"],
        files: [
            {pattern: "_scripts/**/*.js"}, // *.tsx for React Jsx
        ],
    });
};
