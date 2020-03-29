module.exports = {
    entry: {
        calendar: [
            `${__dirname}/style.less`,
            `${__dirname}/index.ts`
        ]
    },
    plugins: [
        new (require(`webpack`)).ProvidePlugin({
            CalendarStyle: `${__dirname}/style.less`
        })
    ]
};