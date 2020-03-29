module.exports = {
    entry: {
        popper: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            PopperStyle: `${__dirname}/style.less`
        })
    ]
};