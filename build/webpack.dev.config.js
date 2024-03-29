const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: '../src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: '../dist'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
};