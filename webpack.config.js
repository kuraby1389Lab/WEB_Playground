// this package automatically inject javascript and css into a html file
const HtmlWebpackPlugin = require('html-webpack-plugin');
// extracting sass and css to a seperated file
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const AppName = "Stethee Vet";

module.exports = {
    entry: './src/react-lib/index.js',
    output: {
        path: __dirname + "/stage",
        filename: 'app.bundle.[chunkhash].js',
        publicPath: '/'
    },

    resolve: {
        alias: {
            lord_of_the_rings: path.resolve(__dirname, './src/styles/lord_of_the_rings.scss')
        },
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', {
                            loader: 'sass-loader',
                            options: {
                                 includePaths: ["./src/styles"]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            }
        ]
    },

    devServer: {
        contentBase: __dirname + "/dist",
        compress: false,
        port: 9002,
        host: "0.0.0.0",
        stats: "errors-only",
        historyApiFallback: true // enable this to server index html to any invalid path
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: AppName,
            template: "./src/index.html",
            filename: "./index.html",
            minify: {
                // Build and minify all the scripts
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new ExtractTextPlugin('style/app.css')
    ]
}
