const path = require('path');
const appRootPath = require('app-root-path').toString();

module.exports = {
    entry: [
        'babel-polyfill',
        './src/js/index.js'
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            use: ['babel-loader'],
            include: path.resolve(appRootPath, 'src/js')
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(appRootPath, 'src/static'),
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: ['src/js', 'node_modules']
    },
    performance: {
        hints: false
    }
};