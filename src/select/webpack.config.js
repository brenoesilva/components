module.exports = {
    entry: {
        select: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            PopperStyle: `${__dirname}/../popper/style.less`,
            SelectStyle: `${__dirname}/style.less`
        })
    ]
};