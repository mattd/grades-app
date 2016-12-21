const path = require('path');

const appRootPath = require('app-root-path').toString();
const webpack = require('webpack');

const base = require('./base');
const version = require('../../package').version;
const development = Object.assign({}, base);

const env = Object.assign(
    require('../firebase/integration'),
    {
        NODE_ENV: JSON.stringify('development'),
        BUILD_COMMIT: JSON.stringify(process.env['BUILD_COMMIT']),
        BUILD_TIMESTAMP: process.env['BUILD_TIMESTAMP'],
        BUILD_VERSION: JSON.stringify(version)
    }
);

development.devtool = 'eval';
development.entry.unshift(
    'webpack-hot-middleware/client',
    'react-hot-loader/patch'
);
development.module.rules.unshift({
    test: /\.js$/,
    use: 'eslint-loader',
    enforce: 'pre',
    include: [path.resolve(appRootPath, 'src/js')]
});
development.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env': env})
];

module.exports = development;