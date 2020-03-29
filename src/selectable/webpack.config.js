module.exports = {
    entry: {
        selectable: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            SelectableStyle: `${__dirname}/style.less`
        })
    ]
};