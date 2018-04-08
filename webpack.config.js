let webpack = require('webpack');
let path = require('path');

let debug = process.env.NODE_ENV !== "development";

module.exports = {
    devtool: debug ? "inline-sourcemap" : null,
    entry: [
        path.resolve(__dirname + '/src/index.js'),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(less|css)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        alias: {
                            images: 'dist/static/img'
                        }
                    }
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.(jpe?g|png|jpg|gif|ico|woff)$/,
                use: {
                    loader: 'url-loader',
                    options: {

                        // NO leading slash
                        name: 'images/[name]-[hash].[ext]',
                    },
                },
            }
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {}
            //         }
            //     ]
            // }
        ]
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            images: path.resolve(__dirname, 'dist/static/img/')
        },
        extensions: ['*', '.js', '.jsx', 'css', 'png']
    },
    output: {
        // path: path.resolve(__dirname + 'dist'),
        // publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ],
    devServer: {
        contentBase: './dist',
        port: "4000"
    }

};