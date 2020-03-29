module.exports = {
    entry: {
        filterable: [
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            styles: `${__dirname}/style.less`
        })
    ]
};