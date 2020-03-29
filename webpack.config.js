var _ = require(`lodash`);

module.exports = require(`glob`).sync(`${__dirname}/src/**/webpack.config.js`).map(function (file) {
    return _.mergeWith({
        output: {
            filename: `[name].js`,
            publicPath: `//components.jlslew.now.sh/`,
            path: `${__dirname}/public`,
            libraryTarget: `system`
        },
        module: {
            rules: [{
                parser: {
                    system: false
                }
            }]
        },
        optimization: {
            minimizer: [
                new (require(`terser-webpack-plugin`))()
            ]
        }
    }, require(file), function (object, source) {
        if (_.isArray(object)) {
            return object.concat(source);
        }
    });
});