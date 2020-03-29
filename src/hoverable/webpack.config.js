module.exports = {
    entry: {
        hoverable: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            HoverableStyle: `${__dirname}/style.less`
        })
    ]
};