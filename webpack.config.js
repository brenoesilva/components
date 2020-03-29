var _ = require(`lodash`), MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

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
            }, {
                exclude: /node_modules/,
                test: /\.ts$/,
                use: {
                    loader: `ts-loader`
                }
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, `css-loader`, {
                        loader: `postcss-loader`,
                        options: {
                            plugins: [
                                require(`autoprefixer`),
                                require(`cssnano`)({
                                    preset: `default`
                                })
                            ]
                        }
                    }
                ]
            }]
        },
        optimization: {
            minimizer: [
                new (require(`terser-webpack-plugin`))()
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `[name].css`
            })
        ]
    }, require(file), function (object, source) {
        if (_.isArray(object)) {
            return object.concat(source);
        }
    });
}).concat({
    entry: require(`glob`).sync(`${__dirname}/src/**/demo.js`).reduce(function (entries, entry) {
        entries[entry.match(/\/src\/([a-z\-]+)\/demo.js/)[1]] = entry;
        return entries;
    }, {}),
    output: {
        filename: `[name].js`,
        publicPath: `//components.jlslew.now.sh/`,
        path: `${__dirname}/public/demo`
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
});