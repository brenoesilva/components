module.exports = {
    entry: {
        fa: [
            `@fortawesome/fontawesome-svg-core/styles.css`,
            `${__dirname}/index.ts`
        ]
    },
    output: {
        chunkFilename: `fa-[id].js`
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            fa: `@fortawesome/fontawesome-svg-core`
        })
    ]
};