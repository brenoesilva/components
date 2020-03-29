module.exports = {
    entry: {
        index: [
            `${__dirname}/style.less`,
            `${__dirname}/index.js`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            styles: `${__dirname}/style.less`
        })
    ]
};