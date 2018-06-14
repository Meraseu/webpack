var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

module.exports = {
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
                            outputStyle: 'compact'
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'compressed' // nested, expanded, compact, compressed
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
        ]
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
        })
    ]
};