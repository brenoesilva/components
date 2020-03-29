module.exports = {
    entry: {
        sortable: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            SortableStyle: `${__dirname}/style.less`
        })
    ]
};