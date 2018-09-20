var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

var config = {

    entry: {
        'index': './src/js/index',
        'sub': './src/js/sub'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: false
                        }
                    },
                    {
                        loader: 'clean-css-loader',
                        options: {
                            format: {
                                breaks: {
                                    afterRuleEnds: true
                                },
                                spaces: {
                                    beforeBlockBegins: true
                                },
                                indentBy: 0,
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            data: '@import "./src/scss/config/_config.prod";',
                            outputStyle: 'compact' // nested, expanded, compact, compressed
                        }
                    }]
                })
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ],
    },
    plugins: [
        extractPlugin,
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/html/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'sub.html',
            template: 'src/html/sub.html',
            chunks: ['sub']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ]
};
module.exports = config;