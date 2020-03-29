module.exports = {
    entry: {
        table: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            TableStyle: `${__dirname}/style.less`
        })
    ]
};