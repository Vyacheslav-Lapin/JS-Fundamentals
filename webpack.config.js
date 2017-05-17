// noinspection SpellCheckingInspection,JSUnresolvedVariable
module.exports = {
    entry: ["./_scripts/init.js", "./_test/YTEmbedLinkSpec.js"],
    output: {
        filename:"build.js"
    },
    watch: true,
    devtool: "source-map"
};
