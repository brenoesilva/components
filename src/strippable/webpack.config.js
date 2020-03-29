module.exports = {
    entry: {
        strippable: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            StrippableStyle: `${__dirname}/style.less`
        })
    ]
};