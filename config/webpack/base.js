const path = require('path');
const appRootPath = require('app-root-path').toString();

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['babel'],
            include: path.resolve(appRootPath, 'src/js')
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(appRootPath, 'src/static'),
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['', '.jsx', '.js']
    }
}
